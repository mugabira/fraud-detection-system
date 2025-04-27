import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'express-app',
  brokers: ['kafka:9092'] // Use 'localhost:9092' if not using Docker
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'express-group' });

export async function connectKafka() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value?.toString(),
      });
    },
  });
  
  console.log('Kafka connected successfully');
}