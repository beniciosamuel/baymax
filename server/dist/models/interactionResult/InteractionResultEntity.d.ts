import type { InteractionResultEntityInterface, InteractionResultRecord } from "./InteractionResultDTO.js";
export declare class InteractionResultEntity implements InteractionResultEntityInterface {
    id: string;
    prescriptionId: string;
    variant: number;
    content: unknown;
    createdAt: Date;
    updatedAt: Date;
    constructor(record: InteractionResultRecord);
    toJSON(): InteractionResultEntityInterface;
}
//# sourceMappingURL=InteractionResultEntity.d.ts.map