import type { PatientEntityInterface, PatientRecord } from "./PatientDTO";

export class PatientEntity implements PatientEntityInterface {
  id: string;
  document: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(record: PatientRecord) {
    this.id = record.id;
    this.document = record.document;
    this.fullName = record.full_name;
    this.createdAt = record.created_at;
    this.updatedAt = record.updated_at;
  }

  toJSON(): PatientEntityInterface {
    return {
      id: this.id,
      document: this.document,
      fullName: this.fullName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
