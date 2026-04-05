import type {
  PrescriptionEntityInterface,
  PrescriptionRecord,
} from "./PrescriptionDTO";

export class PrescriptionEntity implements PrescriptionEntityInterface {
  id: string;
  patientId: string;
  doctorId: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(record: PrescriptionRecord) {
    this.id = record.id;
    this.patientId = record.patient_id;
    this.doctorId = record.doctor_id;
    this.content = record.content;
    this.createdAt = record.created_at;
    this.updatedAt = record.updated_at;
  }

  toJSON(): PrescriptionEntityInterface {
    return {
      id: this.id,
      patientId: this.patientId,
      doctorId: this.doctorId,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
