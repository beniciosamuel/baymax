import type {
  InteractionResultEntityInterface,
  InteractionResultRecord,
} from "./InteractionResultDTO.js";

export class InteractionResultEntity implements InteractionResultEntityInterface {
  id: string;
  prescriptionId: string;
  variant: number;
  content: unknown;
  createdAt: Date;
  updatedAt: Date;

  constructor(record: InteractionResultRecord) {
    this.id = record.id;
    this.prescriptionId = record.prescription_id;
    this.variant = record.variant;
    this.content = record.content;
    this.createdAt = record.created_at;
    this.updatedAt = record.updated_at;
  }

  toJSON(): InteractionResultEntityInterface {
    return {
      id: this.id,
      prescriptionId: this.prescriptionId,
      variant: this.variant,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
