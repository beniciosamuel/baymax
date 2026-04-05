export class PatientAllergiesEntity {
    id;
    patientId;
    medicineId;
    intensity;
    createdAt;
    updatedAt;
    constructor(record) {
        this.id = record.id;
        this.patientId = record.patient_id;
        this.medicineId = record.medicine_id;
        this.intensity = record.intensity;
        this.createdAt = record.created_at;
        this.updatedAt = record.updated_at;
    }
    toJSON() {
        return {
            id: this.id,
            patientId: this.patientId,
            medicineId: this.medicineId,
            intensity: this.intensity,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=PatientAllergiesEntity.js.map