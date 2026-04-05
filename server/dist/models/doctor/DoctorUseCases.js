import { DoctorEntity } from "./DoctorEntity.js";
import { DoctorRepository } from "./DoctorRepository.js";
export class DoctorUseCases {
    static async fromId(id, context) {
        return DoctorRepository.fromId(id, context);
    }
    static async fromDocument(document, context) {
        return DoctorRepository.fromDocument(document, context);
    }
    static async fromFullName(fullName, context) {
        return DoctorRepository.fromFullName(fullName, context);
    }
    static async fromIds(ids, context) {
        return DoctorRepository.fromIds(ids, context);
    }
    static async create(document, fullName, context) {
        return DoctorRepository.create(document, fullName, context);
    }
    static async update(id, document, fullName, context) {
        return DoctorRepository.update(id, document, fullName, context);
    }
}
//# sourceMappingURL=DoctorUseCases.js.map