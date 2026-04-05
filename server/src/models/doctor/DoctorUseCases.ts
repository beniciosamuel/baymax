import type { Context } from "../../services/Context.js";
import { DoctorEntity } from "./DoctorEntity.js";
import { DoctorRepository } from "./DoctorRepository.js";

export class DoctorUseCases {
  static async fromId(id: string, context: Context): Promise<DoctorEntity> {
    return DoctorRepository.fromId(id, context);
  }

  static async fromDocument(
    document: string,
    context: Context,
  ): Promise<DoctorEntity> {
    return DoctorRepository.fromDocument(document, context);
  }

  static async fromFullName(
    fullName: string,
    context: Context,
  ): Promise<DoctorEntity[]> {
    return DoctorRepository.fromFullName(fullName, context);
  }

  static async fromIds(
    ids: string[],
    context: Context,
  ): Promise<DoctorEntity[]> {
    return DoctorRepository.fromIds(ids, context);
  }

  static async create(
    document: string,
    fullName: string,
    context: Context,
  ): Promise<DoctorEntity> {
    return DoctorRepository.create(document, fullName, context);
  }

  static async update(
    id: string,
    document: string | undefined,
    fullName: string | undefined,
    context: Context,
  ): Promise<DoctorEntity> {
    return DoctorRepository.update(id, document, fullName, context);
  }
}
