import { PrescriptionEntity } from "./PrescriptionEntity.js";
import { PrescriptionRepository } from "./PrescriptionRepository.js";
export class PrescriptionUseCases {
    static async getPrescriptionById(id, context) {
        return PrescriptionRepository.fromId(id, context);
    }
    static async createPrescription(args, context) {
        return PrescriptionRepository.create(args, context);
    }
    static async updatePrescriptionContent(args, context) {
        return PrescriptionRepository.updateContent(args, context);
    }
}
//# sourceMappingURL=PrescriptionUseCases.js.map