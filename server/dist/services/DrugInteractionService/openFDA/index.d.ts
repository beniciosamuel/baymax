export declare enum InteractionSourceEnum {
    API = "api",
    CACHE = "cache"
}
export declare class OpenFDAService {
    static buildCacheKey(medicines: string[]): string;
    private static buildResult;
    private static readCachedResult;
    static checkDrugInteractions(medicines: string[]): Promise<{
        [medicine: string]: {
            interationResult: string;
            source: InteractionSourceEnum;
        };
    }>;
}
//# sourceMappingURL=index.d.ts.map