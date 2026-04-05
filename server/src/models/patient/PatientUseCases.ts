import type { Context } from "../../services/Context.js";
import { PatientEntity } from "./PatientEntity.js";
import { PatientRepository } from "./PatientRepository.js";

export class PatientUseCases {
  static async fromId(id: string, context: Context): Promise<PatientEntity> {
    return PatientRepository.fromId(id, context);
  }

  static async fromDocument(
    document: string,
    context: Context,
  ): Promise<PatientEntity> {
    return PatientRepository.fromDocument(document, context);
  }

  static async fromFullName(
    fullName: string,
    context: Context,
  ): Promise<PatientEntity[]> {
    return PatientRepository.fromFullName(fullName, context);
  }

  static async fromIds(
    ids: string[],
    context: Context,
  ): Promise<PatientEntity[]> {
    return PatientRepository.fromIds(ids, context);
  }

  static async create(
    document: string,
    fullName: string,
    context: Context,
  ): Promise<PatientEntity> {
    return PatientRepository.create(document, fullName, context);
  }

  static async update(
    id: string,
    document: string | undefined,
    fullName: string | undefined,
    context: Context,
  ): Promise<PatientEntity> {
    return PatientRepository.update(id, document, fullName, context);
  }
}
