import type { Context } from "../../services/Context";
import type {
  PatientMedicineHistoryCreateDTO,
  PatientMedicineHistoryUpdateDTO,
} from "./PatientMedicineHistoryDTO";
import { PatientMedicineHistoryEntity } from "./PatientMedicineHistoryEntity";
import { PatientMedicineHistoryRepository } from "./PatientMedicineHistoryRepository";

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
