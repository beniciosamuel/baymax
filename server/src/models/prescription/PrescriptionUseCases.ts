import type { Context } from "../../services/Context.js";
import type {
  PrescriptionCreateDTO,
  PrescriptionUpdateContentDTO,
} from "./PrescriptionDTO.js";
import { PrescriptionEntity } from "./PrescriptionEntity.js";
import { PrescriptionRepository } from "./PrescriptionRepository.js";

export class PrescriptionUseCases {
  static async getPrescriptionById(
    id: string,
    context: Context,
  ): Promise<PrescriptionEntity | null> {
    return PrescriptionRepository.fromId(id, context);
  }

  static async createPrescription(
    args: PrescriptionCreateDTO,
    context: Context,
  ): Promise<PrescriptionEntity> {
    return PrescriptionRepository.create(args, context);
  }

  static async updatePrescriptionContent(
    args: PrescriptionUpdateContentDTO,
    context: Context,
  ): Promise<PrescriptionEntity> {
    return PrescriptionRepository.updateContent(args, context);
  }
}
