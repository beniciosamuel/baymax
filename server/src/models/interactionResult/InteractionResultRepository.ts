import type { Context } from "../../services/Context";
import type {
  InteractionResultCreateDTO,
  InteractionResultUpdateDTO,
} from "./InteractionResultDTO";
import { InteractionResultEntity } from "./InteractionResultEntity";

export class InteractionResultRepository {
  static async fromId(
    id: string,
    context: Context,
  ): Promise<InteractionResultEntity | null> {
    const record = await context
      .database("interaction_result")
      .where("id", id)
      .first();

    return record ? new InteractionResultEntity(record) : null;
  }

  static async fromPrescriptionId(
    prescriptionId: string,
    context: Context,
  ): Promise<InteractionResultEntity[]> {
    const records = await context
      .database("interaction_result")
      .where("prescription_id", prescriptionId)
      .orderBy("variant", "desc");

    return records.map((record) => new InteractionResultEntity(record));
  }

  static async create(
    args: InteractionResultCreateDTO,
    context: Context,
  ): Promise<InteractionResultEntity> {
    const [record] = await context
      .database("interaction_result")
      .insert(
        {
          prescription_id: args.prescriptionId,
          variant: args.variant,
          content: args.content,
        },
        "*",
      )
      .catch((error) => {
        console.error("Error inserting interaction result:", error);
        throw new Error("Failed to create interaction result");
      });

    return new InteractionResultEntity(record);
  }

  static async update(
    args: InteractionResultUpdateDTO,
    context: Context,
  ): Promise<InteractionResultEntity> {
    const updateData: Partial<{
      variant: number;
      content: unknown;
      updated_at: Date;
    }> = {
      updated_at: new Date(),
    };

    if (args.variant !== undefined) {
      updateData.variant = args.variant;
    }

    if (args.content !== undefined) {
      updateData.content = args.content;
    }

    const [record] = await context
      .database("interaction_result")
      .where("id", args.id)
      .update(updateData, "*")
      .catch((error) => {
        console.error("Error updating interaction result:", error);
        throw new Error("Failed to update interaction result");
      });

    return new InteractionResultEntity(record);
  }
}
