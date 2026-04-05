import type { Context } from "../../services/Context.js";
import { PatientEntity } from "./PatientEntity.js";
export declare class PatientRepository {
    static fromId(id: string, context: Context): Promise<PatientEntity>;
    static fromDocument(document: string, context: Context): Promise<PatientEntity>;
    static fromFullName(fullName: string, context: Context): Promise<PatientEntity[]>;
    static fromIds(ids: string[], context: Context): Promise<PatientEntity[]>;
    static create(document: string, fullName: string, context: Context): Promise<PatientEntity>;
    static update(id: string, document: string | undefined, fullName: string | undefined, context: Context): Promise<PatientEntity>;
}
//# sourceMappingURL=PatientRepository.d.ts.map