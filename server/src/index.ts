import express from "express";
import type { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { CreateMedicineController } from "./controllers/createMedicine";
import { CreatePatientController } from "./controllers/createPatient";
import { CreatePrescriptionController } from "./controllers/createPrescription";
import { ListPrescriptionsController } from "./controllers/listPrescriptions";
import { SearchMedicinesController } from "./controllers/searchMedicines";
import { SearchPatientController } from "./controllers/searchPatient";

class PrivateExpress {
  private App: express.Application | null = null;
  private Server: ReturnType<typeof createServer> | null = null;

  constructor(args: {
    app: express.Application;
    server: ReturnType<typeof createServer>;
  }) {
    this.App = args.app;
    this.Server = args.server;
  }

  public init() {
    if (!this.App || !this.Server) {
      throw new Error("App and server must be provided");
    }

    this.App.use(cors());
    this.App.use(express.json());
    this.App.use(express.urlencoded({ extended: true }));

    this.App.use(
      cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );

    this.App.get("/", (req: Request, res: Response) => {
      res.send("Hello, World!");
    });

    this.App.post("/create-patient", CreatePatientController.handler);
    this.App.post("/create-medicine", CreateMedicineController.handler);
    this.App.post("/create-prescription", CreatePrescriptionController.handler);

    this.App.get("/search-patient", SearchPatientController.handler);
    this.App.get("/search-medicines", SearchMedicinesController.handler);
    this.App.get("/list-prescriptions", ListPrescriptionsController.handler);

    this.Server.listen(3000, () => {
      console.info("Server is running on port 3000");
    });
  }
}

const app = express();
const server = createServer(app);

const privateExpress = new PrivateExpress({ app, server });

privateExpress.init();
