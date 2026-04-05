import { DoctorRepository, DoctorUseCases } from "./doctor";
import {
  InteractionResultRepository,
  InteractionResultUseCases,
} from "./interactionResult";
import { MedicineRepository, MedicineUseCases } from "./medicine";
import { PatientRepository, PatientUseCases } from "./patient";
import {
  PatientAllergiesRepository,
  PatientAllergiesUseCases,
} from "./patientAllergies";
import {
  PatientMedicineHistoryRepository,
  PatientMedicineHistoryUseCases,
} from "./patientMedicineHistory";
import { PrescriptionRepository, PrescriptionUseCases } from "./prescription";

export default class Model {
  static Doctor = {
    Repository: DoctorRepository,
    UseCases: DoctorUseCases,
  };

  static InteractionResult = {
    Repository: InteractionResultRepository,
    UseCases: InteractionResultUseCases,
  };

  static Medicine = {
    Repository: MedicineRepository,
    UseCases: MedicineUseCases,
  };

  static Patient = {
    Repository: PatientRepository,
    UseCases: PatientUseCases,
  };

  static PatientAllergies = {
    Repository: PatientAllergiesRepository,
    UseCases: PatientAllergiesUseCases,
  };

  static PatientMedicineHistory = {
    Repository: PatientMedicineHistoryRepository,
    UseCases: PatientMedicineHistoryUseCases,
  };

  static Prescription = {
    Repository: PrescriptionRepository,
    UseCases: PrescriptionUseCases,
  };
}
