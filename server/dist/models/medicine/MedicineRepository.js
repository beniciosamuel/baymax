import { MedicineEntity } from "./MedicineEntity.js";
export class MedicineRepository {
    static async fromId(id, context) {
        const record = await context.database("medicine").where("id", id).first();
        if (!record) {
            throw new Error(`Medicine with id ${id} not found`);
        }
        return new MedicineEntity(record);
    }
    static async fromMedicineName(medicineName, context) {
        const records = await context
            .database("medicine")
            .where("medicine_name", "like", `%${medicineName}%`);
        return records.map((record) => new MedicineEntity(record));
    }
    static async fromIds(ids, context) {
        const records = await context.database("medicine").whereIn("id", ids);
        return records.map((record) => new MedicineEntity(record));
    }
    static async create(medicineName, context) {
        const [record] = await context
            .database("medicine")
            .insert({
            medicine_name: medicineName,
        }, "*")
            .catch((error) => {
            console.error("Error inserting medicine:", error);
            throw new Error("Failed to create medicine");
        });
        return new MedicineEntity(record);
    }
    static async update(id, medicineName, context) {
        const updateData = {
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
//# sourceMappingURL=MedicineRepository.js.map