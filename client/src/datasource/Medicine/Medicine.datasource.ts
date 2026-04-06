import { secrets } from "../../services/Secrets";

export type MedicineSearchResult = {
  id: string;
  label: string;
};

type SearchMedicinesResponse = {
  medicines: Array<{
    id: string;
    medicineName: string;
  }>;
};

export class MedicineDataSource {
  async searchByName(query: string): Promise<MedicineSearchResult[]> {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return [];
    }

    const apiUrl = await secrets.getApiUrl();
    const response = await fetch(
      `${apiUrl}/search-medicines?medicineName=${encodeURIComponent(normalizedQuery)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to search medicines");
    }

    const data = (await response.json()) as SearchMedicinesResponse;
    return data.medicines.map((medicine) => ({
      id: medicine.id,
      label: medicine.medicineName,
    }));
  }

  async findExactByLabel(query: string): Promise<MedicineSearchResult | null> {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return null;
    }

    const medicines = await this.searchByName(query);
    return (
      medicines.find(
        (medicine) => medicine.label.toLowerCase() === normalizedQuery,
      ) ?? null
    );
  }
}
