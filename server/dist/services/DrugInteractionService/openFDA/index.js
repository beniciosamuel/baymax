export class OpenFDAService {
    static async checkDrugInteractions(medicines) {
        const interactions = await Promise.all(medicines.map(async (medicine) => {
            const response = await fetch(`https://ap.fda.gov/drug/label.json?search=openfda.generic_name:${encodeURIComponent(medicine)}+AND+drug_interactions:${encodeURIComponent(medicines.filter((m) => m !== medicine).join(","))}&limit=10`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(`OpenFDA API response for ${medicine}:`, response);
            if (!response.ok) {
                console.error(`Failed to fetch interactions for ${medicine}: ${response.statusText}`);
                return { [medicine]: [] };
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
            return { [medicine]: interactionsList };
        }));
        return interactions.reduce((acc, curr) => {
            return { ...acc, ...curr };
        }, {});
    }
}
//# sourceMappingURL=index.js.map