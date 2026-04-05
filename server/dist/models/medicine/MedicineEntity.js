export class MedicineEntity {
    id;
    medicineName;
    createdAt;
    updatedAt;
    constructor(record) {
        this.id = record.id;
        this.medicineName = record.medicine_name;
        this.createdAt = record.created_at;
        this.updatedAt = record.updated_at;
    }
    toJSON() {
        return {
            id: this.id,
            medicineName: this.medicineName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=MedicineEntity.js.map