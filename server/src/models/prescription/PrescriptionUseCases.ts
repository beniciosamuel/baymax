import type { Context } from "../../services/Context";
import type {
  PrescriptionCreateDTO,
  PrescriptionUpdateContentDTO,
} from "./PrescriptionDTO";
import { PrescriptionEntity } from "./PrescriptionEntity";
import { PrescriptionRepository } from "./PrescriptionRepository";

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
