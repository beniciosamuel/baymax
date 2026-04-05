curl -X GET "https://api.fda.gov/drug/label.json?search=openfda.generic_name:ibuprofen+AND+drug_interactions:aspirin&limit=1"

export default class OpenFDAService {
  static async checkDrugInteractions(
    medicines: string[],
  ): Promise<{ [medicine: string]: string[] }> {
    const interactions = await Promises.all(
      medicines.map(async (medicine) => {
        const response = await fetch(
          `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${
            encodeURIComponent(
              medicine,
            )}+AND+drug_interactions:${
              encodeURIComponent(medicines.filter((m) => m !== medicine).join(","))
            }&limit=10`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          console.error(
            `Failed to fetch interactions for ${medicine}: ${response.statusText}`,
          );
          return { [medicine]: [] };
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

        return { [medicine]: interactionsList };
      }),
    );

    return interactions.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
  }
}
