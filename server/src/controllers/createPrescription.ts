import type { Request, Response } from "express";
import { InteractionResultUseCases } from "../models/interactionResult";
import { PatientMedicineHistoryUseCases } from "../models/patientMedicineHistory";
import { PrescriptionUseCases } from "../models/prescription";
import { Context } from "../services/Context";

interface MedicineItemPayload {
  medicineId: string;
  dosage?: string | null;
}

export class CreatePrescriptionController {
  static async handler(req: Request, res: Response) {
    try {
      const { patientId, doctorId, content, medicines, interactionResult } =
        req.body as {
          patientId?: unknown;
          doctorId?: unknown;
          content?: unknown;
          medicines?: unknown;
          interactionResult?: unknown;
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

      const prescription = await PrescriptionUseCases.createPrescription(
        {
          patientId: patientId.trim(),
          doctorId: doctorId.trim(),
          content: content === undefined ? null : (content as string | null),
        },
        context,
      );

      if (Array.isArray(medicines)) {
        const validMedicines = medicines.filter(
          (item): item is MedicineItemPayload =>
            typeof item === "object" &&
            item !== null &&
            "medicineId" in item &&
            typeof (item as { medicineId?: unknown }).medicineId === "string",
        );

        for (const medicine of validMedicines) {
          await PatientMedicineHistoryUseCases.create(
            {
              patientId: patientId.trim(),
              prescriptionId: prescription.id,
              medicineId: medicine.medicineId,
              dosage:
                medicine.dosage === undefined
                  ? null
                  : (medicine.dosage ?? null),
            },
            context,
          );
        }
      }

      if (interactionResult !== undefined) {
        await InteractionResultUseCases.create(
          {
            prescriptionId: prescription.id,
            variant: 1,
            content: interactionResult,
          },
          context,
        );
      }

      return res.status(201).json(prescription.toJSON());
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
