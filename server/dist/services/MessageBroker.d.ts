import { PubSub } from "@google-cloud/pubsub";
export declare class MessageBroker {
    static instance: PubSub | null;
    static getInstance(): PubSub;
    static publish(topicName: string, data: any): Promise<void>;
    static subscribe(topicName: string, subscriptionName: string, messageHandler: (message: any) => void): void;
}
//# sourceMappingURL=MessageBroker.d.ts.map