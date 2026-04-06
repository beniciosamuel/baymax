import { Cache } from "../../Cache.js";
export var InteractionSourceEnum;
(function (InteractionSourceEnum) {
    InteractionSourceEnum["API"] = "api";
    InteractionSourceEnum["CACHE"] = "cache";
})(InteractionSourceEnum || (InteractionSourceEnum = {}));
export class OpenFDAService {
    static buildCacheKey(medicines) {
        const sortedMedicines = medicines.slice().sort();
        return `#drugInteracions#${encodeURIComponent(sortedMedicines.join("+"))}`;
    }
    static buildResult(medicine, interationResult, source) {
        return {
            [medicine]: {
                interationResult,
                source,
            },
        };
    }
    static async readCachedResult(cacheKey, medicine) {
        const cachedValue = await Cache.get(cacheKey);
        if (!cachedValue) {
            return null;
        }
        try {
            const parsed = JSON.parse(cachedValue);
            const cachedMedicine = parsed[medicine];
            const legacyMedicine = cachedMedicine;
            if (cachedMedicine &&
                typeof cachedMedicine === "object" &&
                (typeof legacyMedicine.interationResult === "string" ||
                    typeof legacyMedicine.interactionResult === "string" ||
                    Array.isArray(legacyMedicine.interactions))) {
                let interationResult = "";
                if (typeof legacyMedicine.interationResult === "string") {
                    interationResult = legacyMedicine.interationResult;
                }
                else if (typeof legacyMedicine.interactionResult === "string") {
                    interationResult = legacyMedicine.interactionResult;
                }
                else if (Array.isArray(legacyMedicine.interactions)) {
                    interationResult = legacyMedicine.interactions
                        .flatMap((item) => (Array.isArray(item) ? item : [item]))
                        .filter((item) => typeof item === "string")
                        .map((item) => item.trim())
                        .filter(Boolean)
                        .join(" ");
                }
                return this.buildResult(medicine, interationResult, InteractionSourceEnum.CACHE);
            }
        }
        catch (error) {
            console.error(`Failed to parse cached interactions for ${medicine}:`, error);
        }
        return null;
    }
    static async checkDrugInteractions(medicines) {
        const interactions = await Promise.all(medicines.map(async (medicine) => {
            const interactionSearch = encodeURIComponent(medicines.filter((m) => m !== medicine).join(","));
            const cacheKey = `#drugInteracions#${interactionSearch}`;
            try {
                const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:${encodeURIComponent(medicine)}+AND+drug_interactions:${interactionSearch}&limit=10`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(`OpenFDA API response for ${medicine}:`, response);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                const interactionsList = [];
                if (data.results && Array.isArray(data.results)) {
                    data.results.forEach((result) => {
                        if (result.drug_interactions) {
                            interactionsList.push(result.drug_interactions);
                        }
                    });
                }
                const result = this.buildResult(medicine, interactionsList.join(" "), InteractionSourceEnum.API);
                await Cache.set(cacheKey, JSON.stringify(result));
                return result;
            }
            catch (error) {
                const cachedResult = await this.readCachedResult(cacheKey, medicine);
                if (cachedResult) {
                    return cachedResult;
                }
                console.error(`Failed to fetch interactions for ${medicine} and no cache entry was available:`, error);
                return this.buildResult(medicine, "", InteractionSourceEnum.API);
            }
        }));
        return interactions.reduce((acc, curr) => {
            return { ...acc, ...curr };
        }, {});
    }
}
//# sourceMappingURL=index.js.map