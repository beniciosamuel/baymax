import { PatientMedicineHistoryEntity } from "./PatientMedicineHistoryEntity.js";
export class PatientMedicineHistoryRepository {
    static async fromPrescriptionId(prescriptionId, context) {
        const records = await context
            .database("patient_medicine_history")
            .where("prescription_id", prescriptionId);
        return records.map((record) => new PatientMedicineHistoryEntity(record));
    }
    static async fromPatientId(patientId, context) {
        const records = await context
            .database("patient_medicine_history")
            .where("patient_id", patientId);
        return records.map((record) => new PatientMedicineHistoryEntity(record));
    }
    static async create(args, context) {
        const [record] = await context
            .database("patient_medicine_history")
            .insert({
            patient_id: args.patientId,
            prescription_id: args.prescriptionId,
            medicine_id: args.medicineId,
            dosage: args.dosage ?? null,
        }, "*")
            .catch((error) => {
            console.error("Error inserting patient medicine history:", error);
            throw new Error("Failed to create patient medicine history");
        });
        return new PatientMedicineHistoryEntity(record);
    }
    static async updateDosage(args, context) {
        const [record] = await context
            .database("patient_medicine_history")
            .where("patient_id", args.patientId)
            .andWhere("prescription_id", args.prescriptionId)
            .andWhere("medicine_id", args.medicineId)
            .update({
            dosage: args.dosage,
        }, "*")
            .catch((error) => {
            console.error("Error updating patient medicine history:", error);
            throw new Error("Failed to update patient medicine history");
        });
        return new PatientMedicineHistoryEntity(record);
    }
}
//# sourceMappingURL=PatientMedicineHistoryRepository.js.map