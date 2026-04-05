import type { Request, Response } from "express";
import { PatientUseCases } from "../models/patient/index.js";
import { Context } from "../services/Context.js";

export class CreatePatientController {
  static async handler(req: Request, res: Response) {
    try {
      const { document, fullName } = req.body as {
        document?: unknown;
        fullName?: unknown;
      };

      if (typeof document !== "string" || document.trim().length === 0) {
        return res.status(400).json({ error: "document is required" });
      }

      if (typeof fullName !== "string" || fullName.trim().length === 0) {
        return res.status(400).json({ error: "fullName is required" });
      }

      const context = await Context.initialize();
      const patient = await PatientUseCases.create(
        document.trim(),
        fullName.trim(),
        context,
      );

      return res.status(201).json(patient.toJSON());
    } catch (error) {
      if (error instanceof Error && error.message.includes("duplicate")) {
        return res.status(409).json({ error: "Patient already exists" });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
