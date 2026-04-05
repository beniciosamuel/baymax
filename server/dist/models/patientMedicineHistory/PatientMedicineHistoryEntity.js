export class PatientMedicineHistoryEntity {
    patientId;
    prescriptionId;
    medicineId;
    dosage;
    createdAt;
    constructor(record) {
        this.patientId = record.patient_id;
        this.prescriptionId = record.prescription_id;
        this.medicineId = record.medicine_id;
        this.dosage = record.dosage;
        this.createdAt = record.created_at;
    }
    toJSON() {
        return {
            patientId: this.patientId,
            prescriptionId: this.prescriptionId,
            medicineId: this.medicineId,
            dosage: this.dosage,
            createdAt: this.createdAt,
        };
    }
}
//# sourceMappingURL=PatientMedicineHistoryEntity.js.map