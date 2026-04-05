import { DoctorRepository, DoctorUseCases } from "./doctor/index.js";
import { InteractionResultRepository, InteractionResultUseCases } from "./interactionResult/index.js";
import { MedicineRepository, MedicineUseCases } from "./medicine/index.js";
import { PatientRepository, PatientUseCases } from "./patient/index.js";
import { PatientAllergiesRepository, PatientAllergiesUseCases } from "./patientAllergies/index.js";
import { PatientMedicineHistoryRepository, PatientMedicineHistoryUseCases } from "./patientMedicineHistory/index.js";
import { PrescriptionRepository, PrescriptionUseCases } from "./prescription/index.js";
export default class Model {
    static Doctor: {
        Repository: typeof DoctorRepository;
        UseCases: typeof DoctorUseCases;
    };
    static InteractionResult: {
        Repository: typeof InteractionResultRepository;
        UseCases: typeof InteractionResultUseCases;
    };
    static Medicine: {
        Repository: typeof MedicineRepository;
        UseCases: typeof MedicineUseCases;
    };
    static Patient: {
        Repository: typeof PatientRepository;
        UseCases: typeof PatientUseCases;
    };
    static PatientAllergies: {
        Repository: typeof PatientAllergiesRepository;
        UseCases: typeof PatientAllergiesUseCases;
    };
    static PatientMedicineHistory: {
        Repository: typeof PatientMedicineHistoryRepository;
        UseCases: typeof PatientMedicineHistoryUseCases;
    };
    static Prescription: {
        Repository: typeof PrescriptionRepository;
        UseCases: typeof PrescriptionUseCases;
    };
}
//# sourceMappingURL=index.d.ts.map