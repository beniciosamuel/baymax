import type { Context } from "../../services/Context.js";
import type { InteractionResultRepositoryCreateDTO, InteractionResultUpdateDTO } from "./InteractionResultDTO.js";
import { InteractionResultEntity } from "./InteractionResultEntity.js";
export declare class InteractionResultRepository {
    static fromId(id: string, context: Context): Promise<InteractionResultEntity | null>;
    static fromPrescriptionId(prescriptionId: string, context: Context): Promise<InteractionResultEntity[]>;
    static create(args: InteractionResultRepositoryCreateDTO, context: Context): Promise<InteractionResultEntity>;
    static update(args: InteractionResultUpdateDTO, context: Context): Promise<InteractionResultEntity>;
}
//# sourceMappingURL=InteractionResultRepository.d.ts.map