import { InteractionResultEntity } from "./InteractionResultEntity.js";
import { InteractionResultRepository } from "./InteractionResultRepository.js";
import { OpenFDAService } from "../../services/DrugInteractionService/index.js";
export class InteractionResultUseCases {
    static async fromId(id, context) {
        return InteractionResultRepository.fromId(id, context);
    }
    static async fromPrescriptionId(prescriptionId, context) {
        return InteractionResultRepository.fromPrescriptionId(prescriptionId, context);
    }
    static async create(args, context) {
        const content = await OpenFDAService.checkDrugInteractions(args.drugs);
        return InteractionResultRepository.create({
            prescriptionId: args.prescriptionId,
            content: JSON.stringify(content),
        }, context);
    }
    static async update(args, context) {
        await InteractionResultRepository.update(args, context);
        return true;
    }
}
//# sourceMappingURL=InteractionResultUseCases.js.map