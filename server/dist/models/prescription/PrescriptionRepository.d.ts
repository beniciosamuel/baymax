import type { Context } from "../../services/Context.js";
import type { PrescriptionCreateDTO, PrescriptionUpdateContentDTO } from "./PrescriptionDTO.js";
import { PrescriptionEntity } from "./PrescriptionEntity.js";
export declare class PrescriptionRepository {
    static fromId(id: string, context: Context): Promise<PrescriptionEntity | null>;
    static fromIds(ids: string[], context: Context): Promise<PrescriptionEntity[]>;
    static create(args: PrescriptionCreateDTO, context: Context): Promise<PrescriptionEntity>;
    static updateContent(args: PrescriptionUpdateContentDTO, context: Context): Promise<PrescriptionEntity>;
}
//# sourceMappingURL=PrescriptionRepository.d.ts.map