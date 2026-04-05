import type { Request, Response } from "express";
import Model from "../models/index.js";
import { Context } from "../services/Context.js";

export class CreatePrescriptionController {
  static async handler(req: Request, res: Response) {
    try {
      console.log(
        "Received request to create prescription with body:",
        req.body,
      );
      const { patientId, doctorId, content } = req.body as {
        patientId?: unknown;
        doctorId?: unknown;
        content?: unknown;
      };

      if (typeof patientId !== "string" || patientId.trim().length === 0) {
        return res.status(400).json({ error: "patientId is required" });
      }

      if (typeof doctorId !== "string" || doctorId.trim().length === 0) {
        return res.status(400).json({ error: "doctorId is required" });
      }

      if (
        content !== undefined &&
        content !== null &&
        typeof content !== "string"
      ) {
        return res
          .status(400)
          .json({ error: "content must be a string, null, or omitted" });
      }

      const context = await Context.initialize();

      console.log(
        "Creating prescription with patientId:",
        patientId,
        "doctorId:",
        doctorId,
      );

      const prescription = await Model.Prescription.UseCases.createPrescription(
        {
          patientId: patientId.trim(),
          doctorId: doctorId.trim(),
          content: content === undefined ? null : (content as string | null),
        },
        context,
      );

      return res.status(201).json(prescription.toJSON());
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
