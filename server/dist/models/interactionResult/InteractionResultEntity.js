export class InteractionResultEntity {
    id;
    prescriptionId;
    variant;
    content;
    createdAt;
    updatedAt;
    constructor(record) {
        this.id = record.id;
        this.prescriptionId = record.prescription_id;
        this.variant = record.variant;
        this.content = record.content;
        this.createdAt = record.created_at;
        this.updatedAt = record.updated_at;
    }
    toJSON() {
        return {
            id: this.id,
            prescriptionId: this.prescriptionId,
            variant: this.variant,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=InteractionResultEntity.js.map