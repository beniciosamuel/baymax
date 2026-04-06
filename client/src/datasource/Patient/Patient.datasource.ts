import { secrets } from "../../services/Secrets";

export type PatientSearchResult = {
  id: string;
  searchLabel: string;
};

type SearchPatientResponse = {
  patients: Array<{
    id: string;
    fullName: string;
  }>;
};

export class PatientDataSource {
  async searchByName(query: string): Promise<PatientSearchResult[]> {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return [];
    }

    const apiUrl = await secrets.getApiUrl();
    const response = await fetch(
      `${apiUrl}/search-patient?fullName=${encodeURIComponent(normalizedQuery)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to search patients");
    }

    const data = (await response.json()) as SearchPatientResponse;
    return data.patients.map((patient) => ({
      id: patient.id,
      searchLabel: patient.fullName,
    }));
  }

  async findExactBySearchLabel(
    query: string,
  ): Promise<PatientSearchResult | null> {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return null;
    }

    const patients = await this.searchByName(query);
    return (
      patients.find(
        (patient) => patient.searchLabel.toLowerCase() === normalizedQuery,
      ) ?? null
    );
  }
}
