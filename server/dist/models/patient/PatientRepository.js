import { PatientEntity } from "./PatientEntity.js";
export class PatientRepository {
    static async fromId(id, context) {
        const record = await context.database("patient").where("id", id).first();
        if (!record) {
            throw new Error(`Patient with id ${id} not found`);
        }
        return new PatientEntity(record);
    }
    static async fromDocument(document, context) {
        const record = await context
            .database("patient")
            .where("document", document)
            .first();
        if (!record) {
            throw new Error(`Patient with document ${document} not found`);
        }
        return new PatientEntity(record);
    }
    static async fromFullName(fullName, context) {
        const records = await context
            .database("patient")
            .where("full_name", "like", `%${fullName}%`);
        return records.map((record) => new PatientEntity(record));
    }
    static async fromIds(ids, context) {
        const records = await context.database("patient").whereIn("id", ids);
        return records.map((record) => new PatientEntity(record));
    }
    static async create(document, fullName, context) {
        const [record] = await context
            .database("patient")
            .insert({
            document,
            full_name: fullName,
        }, "*")
            .catch((error) => {
            console.error("Error inserting patient:", error);
            throw new Error("Failed to create patient");
        });
        return new PatientEntity(record);
    }
    static async update(id, document, fullName, context) {
        const updateData = {
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
//# sourceMappingURL=PatientRepository.js.map