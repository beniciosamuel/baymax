import { Secrets } from "./Secrets.js";
import { Cache } from "./Cache.js";
import { MessageBroker } from "./MessageBroker.js";
import { DatabaseService } from "./Database.js";
export class Context {
    secrets;
    cache;
    messageBroker;
    database;
    constructor(args) {
        this.secrets = args.secrets || new Secrets();
        this.cache = args.cache;
        this.messageBroker = args.messageBroker;
        this.database = args.database;
    }
    static async initialize() {
        const secrets = new Secrets();
        const cache = Cache.getInstance();
        if (!Cache.isConnected) {
            await Cache.connect();
        }
        const messageBroker = MessageBroker.getInstance();
        const database = DatabaseService.getInstance();
        return new Context({
            secrets,
            cache,
            messageBroker,
            database: await database.connect(),
        });
    }
}
//# sourceMappingURL=Context.js.map