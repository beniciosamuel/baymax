import { PubSub } from "@google-cloud/pubsub";

export class MessageBroker {
  static instance: PubSub | null = null;

  static getInstance() {
    if (!MessageBroker.instance) {
      MessageBroker.instance = new PubSub();
    } else {
      console.info(
        "PubSub instance already exists. Returning the existing instance.",
      );
    }
    return MessageBroker.instance;
  }

  static async publish(topicName: string, data: any) {
    const instance = MessageBroker.getInstance();

    const dataBuffer = Buffer.from(JSON.stringify(data));

    try {
      const messageId = await instance
        .topic(topicName)
        .publishMessage({ data: dataBuffer });
    } catch (error) {
      console.error(`Error publishing message to topic ${topicName}:`, error);
    }
  }

  static subscribe(
    topicName: string,
    subscriptionName: string,
    messageHandler: (message: any) => void,
  ) {
    const instance = MessageBroker.getInstance();

    const subscription = instance.subscription(subscriptionName);

    subscription.on("message", (message) => {
      try {
        const data = JSON.parse(message.data.toString());
        messageHandler(data);
        message.ack();
      } catch (error) {
        console.error(
          `Error processing message from subscription ${subscriptionName}:`,
          error,
        );
        message.nack();
      }
    });

    subscription.on("error", (error) => {
      console.error(
        `Error with subscription ${subscriptionName} for topic ${topicName}:`,
        error,
      );
    });
  }
}
