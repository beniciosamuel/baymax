import { PatientAllergiesEntity } from "./PatientAllergiesEntity.js";
export class PatientAllergiesRepository {
    static async fromId(id, context) {
        const record = await context
            .database("patient_allergies")
            .where("id", id)
            .first();
        return record ? new PatientAllergiesEntity(record) : null;
    }
    static async fromPatientId(patientId, context) {
        const records = await context
            .database("patient_allergies")
            .where("patient_id", patientId);
        return records.map((record) => new PatientAllergiesEntity(record));
    }
    static async create(args, context) {
        const [record] = await context
            .database("patient_allergies")
            .insert({
            patient_id: args.patientId,
            medicine_id: args.medicineId,
            intensity: args.intensity,
        }, "*")
            .catch((error) => {
            console.error("Error inserting patient allergy:", error);
            throw new Error("Failed to create patient allergy");
        });
        return new PatientAllergiesEntity(record);
    }
    static async update(args, context) {
        const updateData = {
            updated_at: new Date(),
        };
        if (args.medicineId !== undefined) {
            updateData.medicine_id = args.medicineId;
        }
        if (args.intensity !== undefined) {
            updateData.intensity = args.intensity;
        }
        const [record] = await context
            .database("patient_allergies")
            .where("id", args.id)
            .update(updateData, "*")
            .catch((error) => {
            console.error("Error updating patient allergy:", error);
            throw new Error("Failed to update patient allergy");
        });
        return new PatientAllergiesEntity(record);
    }
}
//# sourceMappingURL=PatientAllergiesRepository.js.map