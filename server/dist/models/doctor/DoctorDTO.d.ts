export interface DoctorRecord {
    id: string;
    document: string;
    full_name: string;
    created_at: Date;
    updated_at: Date;
}
export interface DoctorEntityInterface {
    id: string;
    document: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface DoctorCreateDTO {
    document: string;
    fullName: string;
}
export interface DoctorUpdateDTO {
    id: string;
    document?: string;
    fullName?: string;
}
//# sourceMappingURL=DoctorDTO.d.ts.map