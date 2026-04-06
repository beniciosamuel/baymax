import type { Request, Response } from "express";
import Model from "../models/index.js";
import { Context } from "../services/Context.js";

interface PrescriptionUpdatedMessage {
  prescriptionId?: unknown;
  drugs?: unknown;
}

export class CreateInteractionResultController {
  static async consumePrescriptionUpdated(data: unknown): Promise<void> {
    console.log(
      "Received prescription.updated event with data:",
      JSON.stringify(data),
    );
    const { prescriptionId, drugs } = (data ??
      {}) as PrescriptionUpdatedMessage;

    if (
      typeof prescriptionId !== "string" ||
      prescriptionId.trim().length === 0
    ) {
      console.warn(
        "Ignoring prescription.updated event: invalid prescriptionId",
      );
      return;
    }

    if (!Array.isArray(drugs) || drugs.length === 0) {
      console.info(
        `Skipping interaction result creation for prescription ${prescriptionId}: no drugs provided`,
      );
      return;
    }

    const normalizedDrugs = drugs
      .filter((drug): drug is string => typeof drug === "string")
      .map((drug) => drug.trim())
      .filter((drug) => drug.length > 0);

    if (normalizedDrugs.length === 0) {
      console.info(
        `Skipping interaction result creation for prescription ${prescriptionId}: invalid drugs payload`,
      );
      return;
    }

    const context = await Context.initialize();
    const existingPrescription =
      await Model.Prescription.UseCases.getPrescriptionById(
        prescriptionId.trim(),
        context,
      );

    if (!existingPrescription) {
      console.warn(
        `Skipping interaction result creation: prescription ${prescriptionId} was not found`,
      );
      return;
    }

    await Model.InteractionResult.UseCases.create(
      {
        prescriptionId: prescriptionId.trim(),
        drugs: normalizedDrugs,
      },
      context,
    );
  }

  static async handler(req: Request, res: Response) {
    try {
      const { prescriptionId, drugs } = req.body as {
        prescriptionId?: unknown;
        drugs?: unknown;
      };

      if (
        typeof prescriptionId !== "string" ||
        prescriptionId.trim().length === 0
      ) {
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

      const interactionResult = await Model.InteractionResult.UseCases.create(
        {
          prescriptionId: prescriptionId.trim(),
          drugs: drugs as string[],
        },
        context,
      );

      return res.status(201).json(interactionResult.toJSON());
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
