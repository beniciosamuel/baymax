import { PatientAllergiesEntity } from "./PatientAllergiesEntity.js";
import { PatientAllergiesRepository } from "./PatientAllergiesRepository.js";
export class PatientAllergiesUseCases {
    static async fromId(id, context) {
        return PatientAllergiesRepository.fromId(id, context);
    }
    static async fromPatientId(patientId, context) {
        return PatientAllergiesRepository.fromPatientId(patientId, context);
    }
    static async create(args, context) {
        return PatientAllergiesRepository.create(args, context);
    }
    static async update(args, context) {
        return PatientAllergiesRepository.update(args, context);
    }
}
//# sourceMappingURL=PatientAllergiesUseCases.js.map