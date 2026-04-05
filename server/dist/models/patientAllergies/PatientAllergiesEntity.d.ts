import type { PatientAllergiesEntityInterface, PatientAllergiesRecord } from "./PatientAllergiesDTO.js";
export declare class PatientAllergiesEntity implements PatientAllergiesEntityInterface {
    id: string;
    patientId: string;
    medicineId: string;
    intensity: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(record: PatientAllergiesRecord);
    toJSON(): PatientAllergiesEntityInterface;
}
//# sourceMappingURL=PatientAllergiesEntity.d.ts.map