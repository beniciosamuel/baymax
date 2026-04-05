import type { Context } from "../../services/Context";
import { MedicineEntity } from "./MedicineEntity";

export class MedicineRepository {
  static async fromId(id: string, context: Context): Promise<MedicineEntity> {
    const record = await context.database("medicine").where("id", id).first();

    if (!record) {
      throw new Error(`Medicine with id ${id} not found`);
    }

    return new MedicineEntity(record);
  }

  static async fromMedicineName(
    medicineName: string,
    context: Context,
  ): Promise<MedicineEntity[]> {
    const records = await context
      .database("medicine")
      .where("medicine_name", "like", `%${medicineName}%`);

    return records.map((record) => new MedicineEntity(record));
  }

  static async fromIds(
    ids: string[],
    context: Context,
  ): Promise<MedicineEntity[]> {
    const records = await context.database("medicine").whereIn("id", ids);

    return records.map((record) => new MedicineEntity(record));
  }

  static async create(
    medicineName: string,
    context: Context,
  ): Promise<MedicineEntity> {
    const [record] = await context
      .database("medicine")
      .insert(
        {
          medicine_name: medicineName,
        },
        "*",
      )
      .catch((error) => {
        console.error("Error inserting medicine:", error);
        throw new Error("Failed to create medicine");
      });

    return new MedicineEntity(record);
  }

  static async update(
    id: string,
    medicineName: string | undefined,
    context: Context,
  ): Promise<MedicineEntity> {
    const updateData: Partial<{
      medicine_name: string;
      updated_at: Date;
    }> = {
      updated_at: new Date(),
    };

    if (medicineName !== undefined) {
      updateData.medicine_name = medicineName;
    }

    const [record] = await context
      .database("medicine")
      .where("id", id)
      .update(updateData, "*")
      .catch((error) => {
        console.error("Error updating medicine:", error);
        throw new Error("Failed to update medicine");
      });

    return new MedicineEntity(record);
  }
}
