import { DoctorRepository, DoctorUseCases } from "./doctor/index.js";
import {
  InteractionResultRepository,
  InteractionResultUseCases,
} from "./interactionResult/index.js";
import { MedicineRepository, MedicineUseCases } from "./medicine/index.js";
import { PatientRepository, PatientUseCases } from "./patient/index.js";
import {
  PatientAllergiesRepository,
  PatientAllergiesUseCases,
} from "./patientAllergies/index.js";
import {
  PatientMedicineHistoryRepository,
  PatientMedicineHistoryUseCases,
} from "./patientMedicineHistory/index.js";
import {
  PrescriptionRepository,
  PrescriptionUseCases,
} from "./prescription/index.js";

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
