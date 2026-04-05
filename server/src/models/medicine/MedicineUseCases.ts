import type { Context } from "../../services/Context";
import { MedicineEntity } from "./MedicineEntity";
import { MedicineRepository } from "./MedicineRepository";

export class MedicineUseCases {
  static async fromId(id: string, context: Context): Promise<MedicineEntity> {
    return MedicineRepository.fromId(id, context);
  }

  static async fromMedicineName(
    medicineName: string,
    context: Context,
  ): Promise<MedicineEntity[]> {
    return MedicineRepository.fromMedicineName(medicineName, context);
  }

  static async fromIds(
    ids: string[],
    context: Context,
  ): Promise<MedicineEntity[]> {
    return MedicineRepository.fromIds(ids, context);
  }

  static async create(
    medicineName: string,
    context: Context,
  ): Promise<MedicineEntity> {
    return MedicineRepository.create(medicineName, context);
  }

  static async update(
    id: string,
    medicineName: string | undefined,
    context: Context,
  ): Promise<MedicineEntity> {
    return MedicineRepository.update(id, medicineName, context);
  }
}
