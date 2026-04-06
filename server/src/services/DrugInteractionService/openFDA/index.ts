import { Cache } from "../../Cache.js";

export enum InteractionSourceEnum {
  API = "api",
  CACHE = "cache",
}

type InteractionResult = {
  interationResult: string;
  source: InteractionSourceEnum;
};

type InteractionResponse = Record<string, InteractionResult>;

export class OpenFDAService {
  public static buildCacheKey(medicines: string[]): string {
    const sortedMedicines = medicines.slice().sort();
    return `#drugInteracions#${encodeURIComponent(sortedMedicines.join("+"))}`;
  }

  private static buildResult(
    medicine: string,
    interationResult: string,
    source: InteractionSourceEnum,
  ): InteractionResponse {
    return {
      [medicine]: {
        interationResult,
        source,
      },
    };
  }

  private static async readCachedResult(
    cacheKey: string,
    medicine: string,
  ): Promise<InteractionResponse | null> {
    const cachedValue = await Cache.get(cacheKey);

    if (!cachedValue) {
      return null;
    }

    try {
      const parsed = JSON.parse(cachedValue) as Record<string, unknown>;
      const cachedMedicine = parsed[medicine];
      const legacyMedicine = cachedMedicine as {
        interationResult?: unknown;
        interactionResult?: unknown;
        interactions?: unknown;
      };

      if (
        cachedMedicine &&
        typeof cachedMedicine === "object" &&
        (typeof legacyMedicine.interationResult === "string" ||
          typeof legacyMedicine.interactionResult === "string" ||
          Array.isArray(legacyMedicine.interactions))
      ) {
        let interationResult = "";

        if (typeof legacyMedicine.interationResult === "string") {
          interationResult = legacyMedicine.interationResult;
        } else if (typeof legacyMedicine.interactionResult === "string") {
          interationResult = legacyMedicine.interactionResult;
        } else if (Array.isArray(legacyMedicine.interactions)) {
          interationResult = legacyMedicine.interactions
            .flatMap((item) => (Array.isArray(item) ? item : [item]))
            .filter((item): item is string => typeof item === "string")
            .map((item) => item.trim())
            .filter(Boolean)
            .join(" ");
        }

        return this.buildResult(
          medicine,
          interationResult,
          InteractionSourceEnum.CACHE,
        );
      }
    } catch (error) {
      console.error(
        `Failed to parse cached interactions for ${medicine}:`,
        error,
      );
    }

    return null;
  }

  static async checkDrugInteractions(medicines: string[]): Promise<{
    [medicine: string]: {
      interationResult: string;
      source: InteractionSourceEnum;
    };
  }> {
    const interactions = await Promise.all(
      medicines.map(async (medicine) => {
        const interactionSearch = encodeURIComponent(
          medicines.filter((m) => m !== medicine).join(","),
        );
        const cacheKey = `#drugInteracions#${interactionSearch}`;

        try {
          const response = await fetch(
            `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${encodeURIComponent(
              medicine,
            )}+AND+drug_interactions:${interactionSearch}&limit=10`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          console.log(`OpenFDA API response for ${medicine}:`, response);

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = await response.json();
          const interactionsList: string[] = [];

          if (data.results && Array.isArray(data.results)) {
            data.results.forEach((result: any) => {
              if (result.drug_interactions) {
                interactionsList.push(result.drug_interactions);
              }
            });
          }

          const result = this.buildResult(
            medicine,
            interactionsList.join(" "),
            InteractionSourceEnum.API,
          );

          await Cache.set(cacheKey, JSON.stringify(result));

          return result;
        } catch (error) {
          const cachedResult = await this.readCachedResult(cacheKey, medicine);

          if (cachedResult) {
            return cachedResult;
          }

          console.error(
            `Failed to fetch interactions for ${medicine} and no cache entry was available:`,
            error,
          );

          return this.buildResult(medicine, "", InteractionSourceEnum.API);
        }
      }),
    );

    return interactions.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {} as InteractionResponse);
  }
}
