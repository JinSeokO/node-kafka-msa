import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'kafka-broker-client',
  brokers: ['127.0.0.1:9092'],
});

const producer = kafka.producer({
  allowAutoTopicCreation: true,
});
const consumer = kafka.consumer({ groupId: 'kafka-broker-group' });

const app = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });

  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user1!' },
      { value: 'Hello KafkaJS user2!' },
    ],
  });

  setInterval(async () => {
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    });
  }, 3000);
};

app().then().catch(async (error) => {
  console.error(error);
  await producer.disconnect();
  await consumer.disconnect();
});
