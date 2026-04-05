import express from "express";
import { createServer } from "http";
import cors from "cors";
import { CreateMedicineController } from "./controllers/createMedicine.js";
import { CreatePatientController } from "./controllers/createPatient.js";
import { CreatePrescriptionController } from "./controllers/createPrescription.js";
import { ListPrescriptionsController } from "./controllers/listPrescriptions.js";
import { SearchMedicinesController } from "./controllers/searchMedicines.js";
import { SearchPatientController } from "./controllers/searchPatient.js";
import { Secrets } from "./services/Secrets.js";
class PrivateExpress {
    App = null;
    Server = null;
    constructor(args) {
        this.App = args.app;
        this.Server = args.server;
    }
    async init() {
        if (!this.App || !this.Server) {
            throw new Error("App and server must be provided");
        }
        this.App.use(cors());
        this.App.use(express.json());
        this.App.use(express.urlencoded({ extended: true }));
        this.App.use(cors({
            origin: true,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }));
        const secretsService = new Secrets();
        this.App.post("/create-patient", CreatePatientController.handler);
        // this.App.post("/create-medicine", CreateMedicineController.handler);
        this.App.post("/create-prescription", CreatePrescriptionController.handler);
        this.App.get("/search-patient", SearchPatientController.handler);
        this.App.get("/search-medicines", SearchMedicinesController.handler);
        this.App.get("/list-prescriptions", ListPrescriptionsController.handler);
        const serverPort = await secretsService.getServerPort();
        this.Server.listen(serverPort, () => {
            console.info(`Server is running on port ${serverPort}`);
        });
    }
}
const app = express();
const server = createServer(app);
const privateExpress = new PrivateExpress({ app, server });
privateExpress.init().catch((error) => {
    console.error("Failed to initialize server", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map