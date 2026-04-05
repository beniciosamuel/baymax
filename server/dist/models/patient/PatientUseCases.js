import { PatientEntity } from "./PatientEntity.js";
import { PatientRepository } from "./PatientRepository.js";
export class PatientUseCases {
    static async fromId(id, context) {
        return PatientRepository.fromId(id, context);
    }
    static async fromDocument(document, context) {
        return PatientRepository.fromDocument(document, context);
    }
    static async fromFullName(fullName, context) {
        return PatientRepository.fromFullName(fullName, context);
    }
    static async fromIds(ids, context) {
        return PatientRepository.fromIds(ids, context);
    }
    static async create(document, fullName, context) {
        return PatientRepository.create(document, fullName, context);
    }
    static async update(id, document, fullName, context) {
        return PatientRepository.update(id, document, fullName, context);
    }
}
//# sourceMappingURL=PatientUseCases.js.map