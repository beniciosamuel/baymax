import type { Context } from "../../services/Context.js";
import { DoctorEntity } from "./DoctorEntity.js";

export class DoctorRepository {
  static async fromId(id: string, context: Context): Promise<DoctorEntity> {
    const record = await context.database("doctor").where("id", id).first();

    if (!record) {
      throw new Error(`Doctor with id ${id} not found`);
    }

    return new DoctorEntity(record);
  }

  static async fromDocument(
    document: string,
    context: Context,
  ): Promise<DoctorEntity> {
    const record = await context
      .database("doctor")
      .where("document", document)
      .first();

    if (!record) {
      throw new Error(`Doctor with document ${document} not found`);
    }

    return new DoctorEntity(record);
  }

  static async fromFullName(
    fullName: string,
    context: Context,
  ): Promise<DoctorEntity[]> {
    const records = await context
      .database("doctor")
      .where("full_name", "like", `%${fullName}%`);

    return records.map((record) => new DoctorEntity(record));
  }

  static async fromIds(
    ids: string[],
    context: Context,
  ): Promise<DoctorEntity[]> {
    const records = await context.database("doctor").whereIn("id", ids);

    return records.map((record) => new DoctorEntity(record));
  }

  static async create(
    document: string,
    fullName: string,
    context: Context,
  ): Promise<DoctorEntity> {
    const [record] = await context
      .database("doctor")
      .insert(
        {
          document,
          full_name: fullName,
        },
        "*",
      )
      .catch((error) => {
        console.error("Error inserting doctor:", error);
        throw new Error("Failed to create doctor");
      });

    return new DoctorEntity(record);
  }

  static async update(
    id: string,
    document: string | undefined,
    fullName: string | undefined,
    context: Context,
  ): Promise<DoctorEntity> {
    const updateData: Partial<{
      document: string;
      full_name: string;
      updated_at: Date;
    }> = {
      updated_at: new Date(),
    };

    if (document !== undefined) {
      updateData.document = document;
    }
    if (fullName !== undefined) {
      updateData.full_name = fullName;
    }

    const [record] = await context
      .database("doctor")
      .where("id", id)
      .update(updateData, "*")
      .catch((error) => {
        console.error("Error updating doctor:", error);
        throw new Error("Failed to update doctor");
      });

    return new DoctorEntity(record);
  }
}
