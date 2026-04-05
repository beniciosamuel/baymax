import type { Context } from "../../services/Context.js";
import { DoctorEntity } from "./DoctorEntity.js";
export declare class DoctorUseCases {
    static fromId(id: string, context: Context): Promise<DoctorEntity>;
    static fromDocument(document: string, context: Context): Promise<DoctorEntity>;
    static fromFullName(fullName: string, context: Context): Promise<DoctorEntity[]>;
    static fromIds(ids: string[], context: Context): Promise<DoctorEntity[]>;
    static create(document: string, fullName: string, context: Context): Promise<DoctorEntity>;
    static update(id: string, document: string | undefined, fullName: string | undefined, context: Context): Promise<DoctorEntity>;
}
//# sourceMappingURL=DoctorUseCases.d.ts.map