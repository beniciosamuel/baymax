import { InteractionResultEntity } from "./InteractionResultEntity.js";
export class InteractionResultRepository {
    static async fromId(id, context) {
        const record = await context
            .database("interaction_result")
            .where("id", id)
            .first();
        return record ? new InteractionResultEntity(record) : null;
    }
    static async fromPrescriptionId(prescriptionId, context) {
        const records = await context
            .database("interaction_result")
            .where("prescription_id", prescriptionId)
            .orderBy("variant", "desc");
        return records.map((record) => new InteractionResultEntity(record));
    }
    static async create(args, context) {
        const [record] = await context
            .database("interaction_result")
            .insert({
            prescription_id: args.prescriptionId,
            content: args.content,
        }, "*")
            .catch((error) => {
            console.error("Error inserting interaction result:", error);
            throw new Error("Failed to create interaction result");
        });
        return new InteractionResultEntity(record);
    }
    static async update(args, context) {
        const updateData = {
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
//# sourceMappingURL=InteractionResultRepository.js.map