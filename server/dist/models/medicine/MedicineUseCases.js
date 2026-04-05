import { MedicineEntity } from "./MedicineEntity.js";
import { MedicineRepository } from "./MedicineRepository.js";
export class MedicineUseCases {
    static async fromId(id, context) {
        return MedicineRepository.fromId(id, context);
    }
    static async fromMedicineName(medicineName, context) {
        return MedicineRepository.fromMedicineName(medicineName, context);
    }
    static async fromIds(ids, context) {
        return MedicineRepository.fromIds(ids, context);
    }
    static async create(medicineName, context) {
        return MedicineRepository.create(medicineName, context);
    }
    static async update(id, medicineName, context) {
        return MedicineRepository.update(id, medicineName, context);
    }
}
//# sourceMappingURL=MedicineUseCases.js.map