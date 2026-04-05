import type { PatientEntityInterface, PatientRecord } from "./PatientDTO.js";
export declare class PatientEntity implements PatientEntityInterface {
    id: string;
    document: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(record: PatientRecord);
    toJSON(): PatientEntityInterface;
}
//# sourceMappingURL=PatientEntity.d.ts.map