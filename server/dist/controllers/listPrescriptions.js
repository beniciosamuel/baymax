import { InteractionResultUseCases } from "../models/interactionResult/index.js";
import { PatientMedicineHistoryUseCases } from "../models/patientMedicineHistory/index.js";
import { PrescriptionEntity } from "../models/prescription/index.js";
import { PrescriptionUseCases } from "../models/prescription/index.js";
import { Context } from "../services/Context.js";
export class ListPrescriptionsController {
    static async handler(req, res) {
        try {
            const prescriptionIdQuery = req.query.prescriptionId;
            const patientIdQuery = req.query.patientId;
            const prescriptionId = typeof prescriptionIdQuery === "string"
                ? prescriptionIdQuery.trim()
                : "";
            const patientId = typeof patientIdQuery === "string" ? patientIdQuery.trim() : "";
            const context = await Context.initialize();
            if (prescriptionId.length > 0) {
                const prescription = await PrescriptionUseCases.getPrescriptionById(prescriptionId, context);
                if (!prescription) {
                    return res.status(404).json({ error: "Prescription not found" });
                }
                const [history, interactions] = await Promise.all([
                    PatientMedicineHistoryUseCases.fromPrescriptionId(prescriptionId, context),
                    InteractionResultUseCases.fromPrescriptionId(prescriptionId, context),
                ]);
                return res.status(200).json({
                    prescriptions: [
                        {
                            ...prescription.toJSON(),
                            medicines: history.map((item) => item.toJSON()),
                            interactionResults: interactions.map((item) => item.toJSON()),
                        },
                    ],
                });
            }
            if (patientId.length > 0) {
                const records = (await context
                    .database("prescription")
                    .where("patient_id", patientId)
                    .orderBy("created_at", "desc"));
                const result = await Promise.all(records.map(async (record) => {
                    const prescription = new PrescriptionEntity(record);
                    const [history, interactions] = await Promise.all([
                        PatientMedicineHistoryUseCases.fromPrescriptionId(prescription.id, context),
                        InteractionResultUseCases.fromPrescriptionId(prescription.id, context),
                    ]);
                    return {
                        ...prescription.toJSON(),
                        medicines: history.map((item) => item.toJSON()),
                        interactionResults: interactions.map((item) => item.toJSON()),
                    };
                }));
                return res.status(200).json({ prescriptions: result });
            }
            return res
                .status(400)
                .json({ error: "Provide prescriptionId or patientId" });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
//# sourceMappingURL=listPrescriptions.js.map