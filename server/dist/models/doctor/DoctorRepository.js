import { DoctorEntity } from "./DoctorEntity.js";
export class DoctorRepository {
    static async fromId(id, context) {
        const record = await context.database("doctor").where("id", id).first();
        if (!record) {
            throw new Error(`Doctor with id ${id} not found`);
        }
        return new DoctorEntity(record);
    }
    static async fromDocument(document, context) {
        const record = await context
            .database("doctor")
            .where("document", document)
            .first();
        if (!record) {
            throw new Error(`Doctor with document ${document} not found`);
        }
        return new DoctorEntity(record);
    }
    static async fromFullName(fullName, context) {
        const records = await context
            .database("doctor")
            .where("full_name", "like", `%${fullName}%`);
        return records.map((record) => new DoctorEntity(record));
    }
    static async fromIds(ids, context) {
        const records = await context.database("doctor").whereIn("id", ids);
        return records.map((record) => new DoctorEntity(record));
    }
    static async create(document, fullName, context) {
        const [record] = await context
            .database("doctor")
            .insert({
            document,
            full_name: fullName,
        }, "*")
            .catch((error) => {
            console.error("Error inserting doctor:", error);
            throw new Error("Failed to create doctor");
        });
        return new DoctorEntity(record);
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
//# sourceMappingURL=DoctorRepository.js.map