import { PatientMedicineHistoryEntity } from "./PatientMedicineHistoryEntity.js";
import { PatientMedicineHistoryRepository } from "./PatientMedicineHistoryRepository.js";
export class PatientMedicineHistoryUseCases {
    static async fromPrescriptionId(prescriptionId, context) {
        return PatientMedicineHistoryRepository.fromPrescriptionId(prescriptionId, context);
    }
    static async fromPatientId(patientId, context) {
        return PatientMedicineHistoryRepository.fromPatientId(patientId, context);
    }
    static async create(args, context) {
        return PatientMedicineHistoryRepository.create(args, context);
    }
    static async updateDosage(args, context) {
        return PatientMedicineHistoryRepository.updateDosage(args, context);
    }
}
//# sourceMappingURL=PatientMedicineHistoryUseCases.js.map