import type { Context } from "../../services/Context.js";
import type {
  PrescriptionCreateDTO,
  PrescriptionUpdateContentDTO,
} from "./PrescriptionDTO.js";
import { PrescriptionEntity } from "./PrescriptionEntity.js";

export class PrescriptionRepository {
  static async fromId(
    id: string,
    context: Context,
  ): Promise<PrescriptionEntity | null> {
    const record = await context
      .database("prescription")
      .where("id", id)
      .first();

    return record ? new PrescriptionEntity(record) : null;
  }

  static async fromIds(
    ids: string[],
    context: Context,
  ): Promise<PrescriptionEntity[]> {
    const records = await context.database("prescription").whereIn("id", ids);

    return records.map((record) => new PrescriptionEntity(record));
  }

  static async create(
    args: PrescriptionCreateDTO,
    context: Context,
  ): Promise<PrescriptionEntity> {
    const [record] = await context
      .database("prescription")
      .insert(
        {
          patient_id: args.patientId,
          doctor_id: args.doctorId,
          content: args.content ?? null,
        },
        "*",
      )
      .catch((error) => {
        console.error("Error inserting prescription:", error);
        throw new Error("Failed to create prescription");
      });

    return new PrescriptionEntity(record);
  }

  static async updateContent(
    args: PrescriptionUpdateContentDTO,
    context: Context,
  ): Promise<PrescriptionEntity> {
    const { id, content } = args;

    const [record] = await context
      .database("prescription")
      .where("id", id)
      .update(
        {
          content: content ?? null,
          updated_at: new Date(),
        },
        "*",
      )
      .catch((error) => {
        console.error(`Error updating prescription with id ${id}:`, error);
        throw new Error("Failed to update prescription");
      });

    return new PrescriptionEntity(record);
  }
}
