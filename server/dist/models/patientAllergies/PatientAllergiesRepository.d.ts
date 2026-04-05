import type { Context } from "../../services/Context.js";
import type { PatientAllergiesCreateDTO, PatientAllergiesUpdateDTO } from "./PatientAllergiesDTO.js";
import { PatientAllergiesEntity } from "./PatientAllergiesEntity.js";
export declare class PatientAllergiesRepository {
    static fromId(id: string, context: Context): Promise<PatientAllergiesEntity | null>;
    static fromPatientId(patientId: string, context: Context): Promise<PatientAllergiesEntity[]>;
    static create(args: PatientAllergiesCreateDTO, context: Context): Promise<PatientAllergiesEntity>;
    static update(args: PatientAllergiesUpdateDTO, context: Context): Promise<PatientAllergiesEntity>;
}
//# sourceMappingURL=PatientAllergiesRepository.d.ts.map