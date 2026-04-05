import type { Knex } from "knex";
export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionString?: string;
}
export declare class DatabaseConnectionError extends Error {
    readonly cause?: Error | undefined;
    constructor(message: string, cause?: Error | undefined);
}
export declare class DatabaseService {
    private static instance;
    private knexInstance;
    private isConnected;
    private constructor();
    static getInstance(): DatabaseService;
    private getConfig;
    private createKnexConfig;
    connect(): Promise<Knex>;
    getKnex(): Knex;
    isReady(): boolean;
    disconnect(): Promise<void>;
    healthCheck(): Promise<boolean>;
}
//# sourceMappingURL=Database.d.ts.map