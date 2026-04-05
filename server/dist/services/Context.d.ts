import { Secrets } from "./Secrets.js";
import { Cache } from "./Cache.js";
import { MessageBroker } from "./MessageBroker.js";
import type { Knex } from "knex";
export declare class Context {
    secrets: Secrets;
    cache: Cache;
    messageBroker: MessageBroker;
    database: Knex;
    constructor(args: {
        secrets: Secrets;
        cache: Cache;
        messageBroker: MessageBroker;
        database: Knex;
    });
    static initialize(): Promise<Context>;
}
//# sourceMappingURL=Context.d.ts.map