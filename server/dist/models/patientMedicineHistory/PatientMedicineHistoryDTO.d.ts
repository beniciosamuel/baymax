export interface PatientMedicineHistoryRecord {
    patient_id: string;
    prescription_id: string;
    medicine_id: string;
    dosage: string | null;
    created_at: Date;
}
export interface PatientMedicineHistoryEntityInterface {
    patientId: string;
    prescriptionId: string;
    medicineId: string;
    dosage: string | null;
    createdAt: Date;
}
export interface PatientMedicineHistoryCreateDTO {
    patientId: string;
    prescriptionId: string;
    medicineId: string;
    dosage?: string | null;
}
export interface PatientMedicineHistoryUpdateDTO {
    patientId: string;
    prescriptionId: string;
    medicineId: string;
    dosage: string | null;
}
//# sourceMappingURL=PatientMedicineHistoryDTO.d.ts.map