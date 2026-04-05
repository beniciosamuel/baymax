import type { Context } from "../../services/Context";
import type {
  InteractionResultCreateDTO,
  InteractionResultUpdateDTO,
} from "./InteractionResultDTO";
import { InteractionResultEntity } from "./InteractionResultEntity";
import { InteractionResultRepository } from "./InteractionResultRepository";
import { OpenFDAService } from "../../services/DrugInteractionService";

export class InteractionResultUseCases {
  static async fromId(
    id: string,
    context: Context,
  ): Promise<InteractionResultEntity | null> {
    return InteractionResultRepository.fromId(id, context);
  }

  static async fromPrescriptionId(
    prescriptionId: string,
    context: Context,
  ): Promise<InteractionResultEntity[]> {
    return InteractionResultRepository.fromPrescriptionId(
      prescriptionId,
      context,
    );
  }

  static async create(
    args: InteractionResultCreateDTO,
    context: Context,
  ): Promise<InteractionResultEntity> {
    const interactions = await OpenFDAService.checkDrugInteractions(
      args.medicines,
    );

    interactions.forEach((interaction) => {
      await InteractionResultRepository.create(
        {
          prescriptionId: args.prescriptionId,
          medicine: interaction.medicine,
          interactions: interaction,
        },
        context,
      );
    });
  }

  static async update(
    args: InteractionResultUpdateDTO,
    context: Context,
  ): Promise<InteractionResultEntity> {
    return InteractionResultRepository.update(args, context);
  }
}
