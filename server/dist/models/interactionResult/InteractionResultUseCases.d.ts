import type { Context } from "../../services/Context.js";
import type { InteractionResultCreateDTO, InteractionResultUpdateDTO } from "./InteractionResultDTO.js";
import { InteractionResultEntity } from "./InteractionResultEntity.js";
export declare class InteractionResultUseCases {
    static fromId(id: string, context: Context): Promise<InteractionResultEntity | null>;
    static fromPrescriptionId(prescriptionId: string, context: Context): Promise<InteractionResultEntity[]>;
    static create(args: InteractionResultCreateDTO, context: Context): Promise<InteractionResultEntity>;
    static update(args: InteractionResultUpdateDTO, context: Context): Promise<boolean>;
}
//# sourceMappingURL=InteractionResultUseCases.d.ts.map