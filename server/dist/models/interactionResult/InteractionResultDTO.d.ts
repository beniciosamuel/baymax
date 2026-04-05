export interface InteractionResultRecord {
    id: string;
    prescription_id: string;
    variant: number;
    content: unknown;
    created_at: Date;
    updated_at: Date;
}
export interface InteractionResultEntityInterface {
    id: string;
    prescriptionId: string;
    variant: number;
    content: unknown;
    createdAt: Date;
    updatedAt: Date;
}
export interface InteractionResultCreateDTO {
    prescriptionId: string;
    drugs: string[];
}
export interface InteractionResultRepositoryCreateDTO {
    prescriptionId: string;
    content: string;
}
export interface InteractionResultUpdateDTO {
    id: string;
    variant?: number;
    content?: unknown;
}
//# sourceMappingURL=InteractionResultDTO.d.ts.map