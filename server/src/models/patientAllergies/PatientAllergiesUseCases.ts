import type { Context } from "../../services/Context";
import type {
  PatientAllergiesCreateDTO,
  PatientAllergiesUpdateDTO,
} from "./PatientAllergiesDTO";
import { PatientAllergiesEntity } from "./PatientAllergiesEntity";
import { PatientAllergiesRepository } from "./PatientAllergiesRepository";

export class PatientAllergiesUseCases {
  static async fromId(
    id: string,
    context: Context,
  ): Promise<PatientAllergiesEntity | null> {
    return PatientAllergiesRepository.fromId(id, context);
  }

  static async fromPatientId(
    patientId: string,
    context: Context,
  ): Promise<PatientAllergiesEntity[]> {
    return PatientAllergiesRepository.fromPatientId(patientId, context);
  }

  static async create(
    args: PatientAllergiesCreateDTO,
    context: Context,
  ): Promise<PatientAllergiesEntity> {
    return PatientAllergiesRepository.create(args, context);
  }

  static async update(
    args: PatientAllergiesUpdateDTO,
    context: Context,
  ): Promise<PatientAllergiesEntity> {
    return PatientAllergiesRepository.update(args, context);
  }
}
