import { PatientUseCases } from "../models/patient/index.js";
import { Context } from "../services/Context.js";
export class SearchPatientController {
    static async handler(req, res) {
        try {
            const idQuery = req.query.id;
            const documentQuery = req.query.document;
            const fullNameQuery = req.query.fullName;
            const id = typeof idQuery === "string" ? idQuery.trim() : "";
            const document = typeof documentQuery === "string" ? documentQuery.trim() : "";
            const fullName = typeof fullNameQuery === "string" ? fullNameQuery.trim() : "";
            const context = await Context.initialize();
            if (id.length > 0) {
                const patient = await PatientUseCases.fromId(id, context);
                return res.status(200).json({ patients: [patient.toJSON()] });
            }
            if (document.length > 0) {
                const patient = await PatientUseCases.fromDocument(document, context);
                return res.status(200).json({ patients: [patient.toJSON()] });
            }
            if (fullName.length > 0) {
                const patients = await PatientUseCases.fromFullName(fullName, context);
                return res
                    .status(200)
                    .json({ patients: patients.map((patient) => patient.toJSON()) });
            }
            return res.status(400).json({
                error: "Provide at least one query: id, document or fullName",
            });
        }
        catch (error) {
            if (error instanceof Error && error.message.includes("not found")) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
//# sourceMappingURL=searchPatient.js.map