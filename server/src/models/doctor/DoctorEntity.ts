import type { DoctorEntityInterface, DoctorRecord } from "./DoctorDTO";

export class DoctorEntity implements DoctorEntityInterface {
  id: string;
  document: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(args: DoctorRecord) {
    this.id = args.id;
    this.document = args.document;
    this.fullName = args.full_name;
    this.createdAt = args.created_at;
    this.updatedAt = args.updated_at;
  }

  toJSON(): DoctorEntityInterface {
    return {
      id: this.id,
      document: this.document,
      fullName: this.fullName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
