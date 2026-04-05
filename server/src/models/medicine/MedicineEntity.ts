import type { MedicineEntityInterface, MedicineRecord } from "./MedicineDTO";

export class MedicineEntity implements MedicineEntityInterface {
  id: string;
  medicineName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(record: MedicineRecord) {
    this.id = record.id;
    this.medicineName = record.medicine_name;
    this.createdAt = record.created_at;
    this.updatedAt = record.updated_at;
  }

  toJSON(): MedicineEntityInterface {
    return {
      id: this.id,
      medicineName: this.medicineName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
