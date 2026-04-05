import type { MedicineEntityInterface, MedicineRecord } from "./MedicineDTO.js";
export declare class MedicineEntity implements MedicineEntityInterface {
    id: string;
    medicineName: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(record: MedicineRecord);
    toJSON(): MedicineEntityInterface;
}
//# sourceMappingURL=MedicineEntity.d.ts.map