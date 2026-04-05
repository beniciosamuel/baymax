import type { DoctorEntityInterface, DoctorRecord } from "./DoctorDTO.js";
export declare class DoctorEntity implements DoctorEntityInterface {
    id: string;
    document: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(args: DoctorRecord);
    toJSON(): DoctorEntityInterface;
}
//# sourceMappingURL=DoctorEntity.d.ts.map