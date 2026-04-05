import fs from "fs";
import path from "path";
const SECRETS_DIR = path.join(process.cwd(), ".env");
export class Secrets {
    env = process.env.NODE_ENV === "production" ? "production" : "development";
    async setEnv(env) {
        if (this.env === "development") {
            this.env = env;
        }
    }
    async getSecrets() {
        const secretsPath = path.join(SECRETS_DIR, "secrets.json");
        return JSON.parse(fs.readFileSync(secretsPath, "utf8"));
    }
    async getEnvSecrets() {
        const secrets = await this.getSecrets();
        return secrets[this.env] || {};
    }
    async getString(key) {
        try {
            const secrets = await this.getSecrets();
            const nodes = secrets[this.env] || {};
            const secret = nodes[key];
            if (!secret) {
                throw new Error(`Secret ${key} not found`);
            }
            return secret;
        }
        catch (error) {
            throw new Error(`Failed to get secret ${key}: ${error}`);
        }
    }
    async getServerPort() {
        const portStr = await this.getString("SERVER_PORT").catch(() => "3000");
        return parseInt(portStr, 10) || 3000;
    }
    async getDatabaseConfig() {
        const secrets = await this.getEnvSecrets();
        return {
            host: secrets.DB_HOST || "127.0.0.1",
            port: parseInt(secrets.DB_PORT ?? "5432", 10) || 5432,
            user: secrets.DB_USER || "postgres",
            password: secrets.DB_PASSWORD || "postgres",
            database: secrets.DB_NAME || "baymax",
            ...(secrets.DATABASE_URL && { connectionString: secrets.DATABASE_URL }),
        };
    }
    async getRedisConfig() {
        const secrets = await this.getEnvSecrets();
        return {
            host: secrets.REDIS_HOST || "127.0.0.1",
            port: parseInt(secrets.REDIS_PORT ?? "6379", 10) || 6379,
            username: secrets.REDIS_USERNAME || "",
            password: secrets.REDIS_PASSWORD || "",
        };
    }
}
//# sourceMappingURL=Secrets.js.map