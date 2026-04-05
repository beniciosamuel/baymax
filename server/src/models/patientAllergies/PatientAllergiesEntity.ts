import type {
  PatientAllergiesEntityInterface,
  PatientAllergiesRecord,
} from "./PatientAllergiesDTO.js";

export class PatientAllergiesEntity implements PatientAllergiesEntityInterface {
  id: string;
  patientId: string;
  medicineId: string;
  intensity: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(record: PatientAllergiesRecord) {
    this.id = record.id;
    this.patientId = record.patient_id;
    this.medicineId = record.medicine_id;
    this.intensity = record.intensity;
    this.createdAt = record.created_at;
    this.updatedAt = record.updated_at;
  }

  toJSON(): PatientAllergiesEntityInterface {
    return {
      id: this.id,
      patientId: this.patientId,
      medicineId: this.medicineId,
      intensity: this.intensity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
