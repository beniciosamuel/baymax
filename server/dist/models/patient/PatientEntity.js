export class PatientEntity {
    id;
    document;
    fullName;
    createdAt;
    updatedAt;
    constructor(record) {
        this.id = record.id;
        this.document = record.document;
        this.fullName = record.full_name;
        this.createdAt = record.created_at;
        this.updatedAt = record.updated_at;
    }
    toJSON() {
        return {
            id: this.id,
            document: this.document,
            fullName: this.fullName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=PatientEntity.js.map