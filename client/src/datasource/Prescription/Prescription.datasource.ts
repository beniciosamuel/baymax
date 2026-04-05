export class PrescriptionDataSource {
  async search(query: string) {
    const res = await fetch(
      `/api/prescriptions/search?q=${encodeURIComponent(query)}`,
    );
    if (!res.ok) {
      throw new Error("Failed to search prescriptions");
    }
    return res.json() as Promise<{ id: string; name: string }[]>;
  }

  async get(id: string) {
    const res = await fetch(`/api/prescriptions/${id}`);
    if (!res.ok) {
      throw new Error("Failed to get prescription");
    }
    return res.json() as Promise<{
      id: string;
      name: string;
      description: string;
      medications: { name: string; dosage: string }[];
    }>;
  }

  async create(data: { patientId: string; doctorId: string }) {
    const res = await fetch(`/api/prescriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to create prescription");
    }
    return res.json() as Promise<{ id: string }>;
  }

  async update(id: string, data: { name?: string; description?: string }) {
    const res = await fetch(`/api/prescriptions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to update prescription");
    }
    return res.json() as Promise<void>;
  }

  async saveMedications(
    prescriptionId: string,
    medications: { name: string; dosage: string }[],
  ) {
    const res = await fetch(
      `/api/prescriptions/${prescriptionId}/medications`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medications }),
      },
    );
    if (!res.ok) {
      throw new Error("Failed to save medications");
    }
    return res.json() as Promise<void>;
  }
}
