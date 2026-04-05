import type { Context } from "../../services/Context.js";
import { MedicineEntity } from "./MedicineEntity.js";
export declare class MedicineRepository {
    static fromId(id: string, context: Context): Promise<MedicineEntity>;
    static fromMedicineName(medicineName: string, context: Context): Promise<MedicineEntity[]>;
    static fromIds(ids: string[], context: Context): Promise<MedicineEntity[]>;
    static create(medicineName: string, context: Context): Promise<MedicineEntity>;
    static update(id: string, medicineName: string | undefined, context: Context): Promise<MedicineEntity>;
}
//# sourceMappingURL=MedicineRepository.d.ts.map