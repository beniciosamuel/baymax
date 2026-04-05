import Model from "../models/index.js";
import { Context } from "../services/Context.js";
export class CreateInteractionResultController {
    static async consumePrescriptionUpdated(data) {
        const { prescriptionId, drugs } = (data ??
            {});
        if (typeof prescriptionId !== "string" ||
            prescriptionId.trim().length === 0) {
            console.warn("Ignoring prescription.updated event: invalid prescriptionId");
            return;
        }
        if (!Array.isArray(drugs) || drugs.length === 0) {
            console.info(`Skipping interaction result creation for prescription ${prescriptionId}: no drugs provided`);
            return;
        }
        const normalizedDrugs = drugs
            .filter((drug) => typeof drug === "string")
            .map((drug) => drug.trim())
            .filter((drug) => drug.length > 0);
        if (normalizedDrugs.length === 0) {
            console.info(`Skipping interaction result creation for prescription ${prescriptionId}: invalid drugs payload`);
            return;
        }
        const context = await Context.initialize();
        await Model.InteractionResult.UseCases.create({
            prescriptionId: prescriptionId.trim(),
            drugs: normalizedDrugs,
        }, context);
    }
    static async handler(req, res) {
        try {
            const { prescriptionId, drugs } = req.body;
            if (typeof prescriptionId !== "string" ||
                prescriptionId.trim().length === 0) {
                return res.status(400).json({ error: "prescriptionId is required" });
            }
            if (!Array.isArray(drugs) || drugs.length === 0) {
                return res
                    .status(400)
                    .json({ error: "drugs must be a non-empty array" });
            }
            if (!drugs.every((drug) => typeof drug === "string")) {
                return res.status(400).json({ error: "all drugs must be strings" });
            }
            const context = await Context.initialize();
            const interactionResult = await Model.InteractionResult.UseCases.create({
                prescriptionId: prescriptionId.trim(),
                drugs: drugs,
            }, context);
            return res.status(201).json(interactionResult.toJSON());
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
//# sourceMappingURL=createInteractionResult.js.map