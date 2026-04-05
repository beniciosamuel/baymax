import type { Request, Response } from "express";
import Model from "../models";
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

      /* 
      Valida os dados da requisição aqui
        - Verifica se patientId e doctorId existem e são válidos
        - Verifica se content é uma string ou null
        - Cria registro de prescription
        - Faz requisição ao serviço de interações medicamentosas para validar o conteúdo da prescrição
        - Criar registro de interaction_results para armazenar os resultados da validação de interações 
          medicamentosas com a versão da prescrição 
    */

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
