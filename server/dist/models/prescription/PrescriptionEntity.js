export class PrescriptionEntity {
    id;
    patientId;
    doctorId;
    content;
    createdAt;
    updatedAt;
    constructor(record) {
        this.id = record.id;
        this.patientId = record.patient_id;
        this.doctorId = record.doctor_id;
        this.content = record.content;
        this.createdAt = record.created_at;
        this.updatedAt = record.updated_at;
    }
    toJSON() {
        return {
            id: this.id,
            patientId: this.patientId,
            doctorId: this.doctorId,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=PrescriptionEntity.js.map