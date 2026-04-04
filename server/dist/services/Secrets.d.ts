export declare class Secrets {
    private env;
    setEnv(env: "development" | "production"): Promise<void>;
    private getSecrets;
    private getEnvSecrets;
    getString(key: string): Promise<string>;
    getDatabaseConfig(): Promise<{
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
        connectionString?: string;
    }>;
    getResendApiKey(): Promise<string>;
}
//# sourceMappingURL=Secrets.d.ts.map