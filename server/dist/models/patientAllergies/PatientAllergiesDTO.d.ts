export interface PatientAllergiesRecord {
    id: string;
    patient_id: string;
    medicine_id: string;
    intensity: number;
    created_at: Date;
    updated_at: Date;
}
export interface PatientAllergiesEntityInterface {
    id: string;
    patientId: string;
    medicineId: string;
    intensity: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface PatientAllergiesCreateDTO {
    patientId: string;
    medicineId: string;
    intensity: number;
}
export interface PatientAllergiesUpdateDTO {
    id: string;
    medicineId?: string;
    intensity?: number;
}
//# sourceMappingURL=PatientAllergiesDTO.d.ts.map