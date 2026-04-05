import { PubSub } from "@google-cloud/pubsub";
export declare class MessageBroker {
    static instance: PubSub | null;
    static getInstance(): PubSub;
    static publish(topicName: string, data: any): Promise<void>;
    static subscribe(topicName: string, messageHandler: (data: any) => Promise<void>): void;
}
//# sourceMappingURL=MessageBroker.d.ts.map