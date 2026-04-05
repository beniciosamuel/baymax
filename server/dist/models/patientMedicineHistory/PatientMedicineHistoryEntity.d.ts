import type { PatientMedicineHistoryEntityInterface, PatientMedicineHistoryRecord } from "./PatientMedicineHistoryDTO.js";
export declare class PatientMedicineHistoryEntity implements PatientMedicineHistoryEntityInterface {
    patientId: string;
    prescriptionId: string;
    medicineId: string;
    dosage: string | null;
    createdAt: Date;
    constructor(record: PatientMedicineHistoryRecord);
    toJSON(): PatientMedicineHistoryEntityInterface;
}
//# sourceMappingURL=PatientMedicineHistoryEntity.d.ts.map