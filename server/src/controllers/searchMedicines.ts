import type { Request, Response } from "express";
import { MedicineUseCases } from "../models/medicine";
import { Context } from "../services/Context";

export class SearchMedicinesController {
  static async handler(req: Request, res: Response) {
    try {
      const idQuery = req.query.id;
      const medicineNameQuery = req.query.medicineName;

      const id = typeof idQuery === "string" ? idQuery.trim() : "";
      const medicineName =
        typeof medicineNameQuery === "string" ? medicineNameQuery.trim() : "";

      const context = await Context.initialize();

      if (id.length > 0) {
        const medicine = await MedicineUseCases.fromId(id, context);
        return res.status(200).json({ medicines: [medicine.toJSON()] });
      }

      if (medicineName.length > 0) {
        const medicines = await MedicineUseCases.fromMedicineName(
          medicineName,
          context,
        );
        return res
          .status(200)
          .json({ medicines: medicines.map((item) => item.toJSON()) });
      }

      return res
        .status(400)
        .json({ error: "Provide at least one query: id or medicineName" });
    } catch (error) {
      if (error instanceof Error && error.message.includes("not found")) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
