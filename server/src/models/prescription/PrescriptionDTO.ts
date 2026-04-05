export interface PrescriptionRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  content: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface PrescriptionEntityInterface {
  id: string;
  patientId: string;
  doctorId: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescriptionCreateDTO {
  patientId: string;
  doctorId: string;
  content?: string | null;
}

export interface PrescriptionUpdateContentDTO {
  id: string;
  content: string | null;
}
