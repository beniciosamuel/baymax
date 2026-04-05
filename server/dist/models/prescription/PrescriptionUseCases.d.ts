import type { Context } from "../../services/Context.js";
import type { PrescriptionCreateDTO, PrescriptionUpdateContentDTO } from "./PrescriptionDTO.js";
import { PrescriptionEntity } from "./PrescriptionEntity.js";
export declare class PrescriptionUseCases {
    static getPrescriptionById(id: string, context: Context): Promise<PrescriptionEntity | null>;
    static createPrescription(args: PrescriptionCreateDTO, context: Context): Promise<PrescriptionEntity>;
    static updatePrescriptionContent(args: PrescriptionUpdateContentDTO, context: Context): Promise<PrescriptionEntity>;
}
//# sourceMappingURL=PrescriptionUseCases.d.ts.map