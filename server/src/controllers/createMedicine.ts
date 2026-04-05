import type { Request, Response } from "express";
import { MedicineUseCases } from "../models/medicine/index.js";
import { Context } from "../services/Context.js";

export class CreateMedicineController {
  static async handler(req: Request, res: Response) {
    try {
      const { medicineName } = req.body as { medicineName?: unknown };

      if (
        typeof medicineName !== "string" ||
        medicineName.trim().length === 0
      ) {
        return res.status(400).json({ error: "medicineName is required" });
      }

      const context = await Context.initialize();
      const medicine = await MedicineUseCases.create(
        medicineName.trim(),
        context,
      );

      return res.status(201).json(medicine.toJSON());
    } catch (error) {
      if (error instanceof Error && error.message.includes("duplicate")) {
        return res.status(409).json({ error: "Medicine already exists" });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
