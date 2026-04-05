import type {
  PatientMedicineHistoryEntityInterface,
  PatientMedicineHistoryRecord,
} from "./PatientMedicineHistoryDTO";

export class PatientMedicineHistoryEntity implements PatientMedicineHistoryEntityInterface {
  patientId: string;
  prescriptionId: string;
  medicineId: string;
  dosage: string | null;
  createdAt: Date;

  constructor(record: PatientMedicineHistoryRecord) {
    this.patientId = record.patient_id;
    this.prescriptionId = record.prescription_id;
    this.medicineId = record.medicine_id;
    this.dosage = record.dosage;
    this.createdAt = record.created_at;
  }

  toJSON(): PatientMedicineHistoryEntityInterface {
    return {
      patientId: this.patientId,
      prescriptionId: this.prescriptionId,
      medicineId: this.medicineId,
      dosage: this.dosage,
      createdAt: this.createdAt,
    };
  }
}
