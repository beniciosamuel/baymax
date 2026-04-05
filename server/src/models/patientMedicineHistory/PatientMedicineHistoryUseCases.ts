import type { Context } from "../../services/Context.js";
import type {
  PatientMedicineHistoryCreateDTO,
  PatientMedicineHistoryUpdateDTO,
} from "./PatientMedicineHistoryDTO.js";
import { PatientMedicineHistoryEntity } from "./PatientMedicineHistoryEntity.js";
import { PatientMedicineHistoryRepository } from "./PatientMedicineHistoryRepository.js";

export class PatientMedicineHistoryUseCases {
  static async fromPrescriptionId(
    prescriptionId: string,
    context: Context,
  ): Promise<PatientMedicineHistoryEntity[]> {
    return PatientMedicineHistoryRepository.fromPrescriptionId(
      prescriptionId,
      context,
    );
  }

  static async fromPatientId(
    patientId: string,
    context: Context,
  ): Promise<PatientMedicineHistoryEntity[]> {
    return PatientMedicineHistoryRepository.fromPatientId(patientId, context);
  }

  static async create(
    args: PatientMedicineHistoryCreateDTO,
    context: Context,
  ): Promise<PatientMedicineHistoryEntity> {
    return PatientMedicineHistoryRepository.create(args, context);
  }

  static async updateDosage(
    args: PatientMedicineHistoryUpdateDTO,
    context: Context,
  ): Promise<PatientMedicineHistoryEntity> {
    return PatientMedicineHistoryRepository.updateDosage(args, context);
  }
}
