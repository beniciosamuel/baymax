import type { Context } from "../../services/Context.js";
import { PatientEntity } from "./PatientEntity.js";

export class PatientRepository {
  static async fromId(id: string, context: Context): Promise<PatientEntity> {
    const record = await context.database("patient").where("id", id).first();

    if (!record) {
      throw new Error(`Patient with id ${id} not found`);
    }

    return new PatientEntity(record);
  }

  static async fromDocument(
    document: string,
    context: Context,
  ): Promise<PatientEntity> {
    const record = await context
      .database("patient")
      .where("document", document)
      .first();

    if (!record) {
      throw new Error(`Patient with document ${document} not found`);
    }

    return new PatientEntity(record);
  }

  static async fromFullName(
    fullName: string,
    context: Context,
  ): Promise<PatientEntity[]> {
    const records = await context
      .database("patient")
      .where("full_name", "like", `%${fullName}%`);

    return records.map((record) => new PatientEntity(record));
  }

  static async fromIds(
    ids: string[],
    context: Context,
  ): Promise<PatientEntity[]> {
    const records = await context.database("patient").whereIn("id", ids);

    return records.map((record) => new PatientEntity(record));
  }

  static async create(
    document: string,
    fullName: string,
    context: Context,
  ): Promise<PatientEntity> {
    const [record] = await context
      .database("patient")
      .insert(
        {
          document,
          full_name: fullName,
        },
        "*",
      )
      .catch((error) => {
        console.error("Error inserting patient:", error);
        throw new Error("Failed to create patient");
      });

    return new PatientEntity(record);
  }

  static async update(
    id: string,
    document: string | undefined,
    fullName: string | undefined,
    context: Context,
  ): Promise<PatientEntity> {
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
      .database("patient")
      .where("id", id)
      .update(updateData, "*")
      .catch((error) => {
        console.error("Error updating patient:", error);
        throw new Error("Failed to update patient");
      });

    return new PatientEntity(record);
  }
}
