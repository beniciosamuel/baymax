import type { Context } from "../../services/Context.js";
import type {
  InteractionResultCreateDTO,
  InteractionResultUpdateDTO,
} from "./InteractionResultDTO.js";
import { InteractionResultEntity } from "./InteractionResultEntity.js";
import { InteractionResultRepository } from "./InteractionResultRepository.js";
import { OpenFDAService } from "../../services/DrugInteractionService/index.js";

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
    const content = await OpenFDAService.checkDrugInteractions(args.drugs);

    return InteractionResultRepository.create(
      {
        prescriptionId: args.prescriptionId,
        content: JSON.stringify(content),
      },
      context,
    );
  }

  static async update(
    args: InteractionResultUpdateDTO,
    context: Context,
  ): Promise<boolean> {
    await InteractionResultRepository.update(args, context);
    return true;
  }
}
