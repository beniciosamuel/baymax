import Model from "../models/index.js";
import { Context } from "../services/Context.js";
import { MessageBroker } from "../services/MessageBroker.js";
export class UpdatePrescriptionController {
    static async handler(req, res) {
        try {
            const { id, content, drugs } = req.body;
            if (typeof id !== "string" || id.trim().length === 0) {
                return res.status(400).json({ error: "id is required" });
            }
            if (content !== undefined &&
                content !== null &&
                typeof content !== "string") {
                return res
                    .status(400)
                    .json({ error: "content must be a string, null, or omitted" });
            }
            if (drugs !== undefined && !Array.isArray(drugs)) {
                return res
                    .status(400)
                    .json({ error: "drugs must be an array of strings" });
            }
            if (Array.isArray(drugs) &&
                !drugs.every((drug) => typeof drug === "string")) {
                return res.status(400).json({ error: "all drugs must be strings" });
            }
            const normalizedDrugs = Array.isArray(drugs)
                ? drugs.map((drug) => drug.trim()).filter((drug) => drug.length > 0)
                : [];
            const context = await Context.initialize();
            const prescription = await Model.Prescription.UseCases.updatePrescriptionContent({
                id: id.trim(),
                content: content === undefined ? null : content,
            }, context);
            await MessageBroker.publish("prescriptionUpdated", {
                prescriptionId: prescription.id,
                drugs: normalizedDrugs,
            });
            return res.status(200).json(prescription.toJSON());
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
//# sourceMappingURL=updatePrescription.js.map