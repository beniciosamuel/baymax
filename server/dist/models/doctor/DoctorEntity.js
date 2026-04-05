export class DoctorEntity {
    id;
    document;
    fullName;
    createdAt;
    updatedAt;
    constructor(args) {
        this.id = args.id;
        this.document = args.document;
        this.fullName = args.full_name;
        this.createdAt = args.created_at;
        this.updatedAt = args.updated_at;
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
//# sourceMappingURL=DoctorEntity.js.map