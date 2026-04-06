import { secrets } from "../../services/Secrets";
import type { MedicineRecord } from "../../data/medicinesCatalog";

export type CreatePrescriptionResult = {
  id: string;
};

export type UpdatePrescriptionResult = {
  success: boolean;
};

export type PrescriptionInteractionResult = {
  id: string;
  prescriptionId: string;
  variant: number;
  content: unknown;
  createdAt: string;
  updatedAt: string;
};

export type PrescriptionDetails = {
  id: string;
  interactionResults: PrescriptionInteractionResult[];
};

export class InteractionResultDataSource {
  async createPrescription(
    patientId: string,
  ): Promise<CreatePrescriptionResult> {
    const apiUrl = await secrets.getApiUrl();
    const response = await fetch(`${apiUrl}/create-prescription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId,
        doctorId: "22222222-2222-2222-2222-222222222221",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create prescription");
    }

    const data = (await response.json()) as CreatePrescriptionResult;
    return data;
  }

  async updatePrescription(
    prescriptionId: string,
    medicines: MedicineRecord[],
    content?: string,
  ): Promise<UpdatePrescriptionResult> {
    const apiUrl = await secrets.getApiUrl();
    const drugs = medicines.map((medicine) => medicine.name);

    const body: {
      id: string;
      drugs: string[];
      content?: string;
    } = {
      id: prescriptionId,
      drugs,
    };

    if (content) {
      body.content = content;
    }

    const response = await fetch(`${apiUrl}/update-prescription`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update prescription");
    }

    const data = (await response.json()) as UpdatePrescriptionResult;
    return data;
  }

  async getPrescriptionById(
    prescriptionId: string,
  ): Promise<PrescriptionDetails | null> {
    const apiUrl = await secrets.getApiUrl();
    const response = await fetch(
      `${apiUrl}/list-prescriptions?prescriptionId=${encodeURIComponent(prescriptionId)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch prescription details");
    }

    const data = (await response.json()) as {
      prescriptions?: PrescriptionDetails[];
    };
    if (!Array.isArray(data.prescriptions) || data.prescriptions.length === 0) {
      return null;
    }

    return data.prescriptions[0] ?? null;
  }
}
