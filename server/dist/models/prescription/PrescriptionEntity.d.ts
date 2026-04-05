import type { PrescriptionEntityInterface, PrescriptionRecord } from "./PrescriptionDTO.js";
export declare class PrescriptionEntity implements PrescriptionEntityInterface {
    id: string;
    patientId: string;
    doctorId: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    constructor(record: PrescriptionRecord);
    toJSON(): PrescriptionEntityInterface;
}
//# sourceMappingURL=PrescriptionEntity.d.ts.map