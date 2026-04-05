import type { Context } from "../../services/Context.js";
import type { PatientMedicineHistoryCreateDTO, PatientMedicineHistoryUpdateDTO } from "./PatientMedicineHistoryDTO.js";
import { PatientMedicineHistoryEntity } from "./PatientMedicineHistoryEntity.js";
export declare class PatientMedicineHistoryRepository {
    static fromPrescriptionId(prescriptionId: string, context: Context): Promise<PatientMedicineHistoryEntity[]>;
    static fromPatientId(patientId: string, context: Context): Promise<PatientMedicineHistoryEntity[]>;
    static create(args: PatientMedicineHistoryCreateDTO, context: Context): Promise<PatientMedicineHistoryEntity>;
    static updateDosage(args: PatientMedicineHistoryUpdateDTO, context: Context): Promise<PatientMedicineHistoryEntity>;
}
//# sourceMappingURL=PatientMedicineHistoryRepository.d.ts.map