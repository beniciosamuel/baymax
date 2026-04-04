import express from "express";
import { createServer } from "http";
import cors from "cors";
class PrivateExpress {
    App = null;
    Server = null;
    constructor(args) {
        this.App = args.app;
        this.Server = args.server;
    }
    init() {
        if (!this.App || !this.Server) {
            throw new Error("App and server must be provided");
        }
        this.App.use(cors());
        this.App.use(express.json());
        this.App.use(express.urlencoded({ extended: true }));
        this.App.get("/", (req, res) => {
            res.send("Hello, World!");
        });
        this.Server.listen(3000, () => {
            console.info("Server is running on port 3000");
        });
    }
}
const app = express();
const server = createServer(app);
const privateExpress = new PrivateExpress({ app, server });
privateExpress.init();
//# sourceMappingURL=index.js.map