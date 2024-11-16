const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'crm',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const createConsumer = (groupId) => {
  return kafka.consumer({ groupId });
};

const initKafka = async () => {
  await producer.connect();
  console.log('Producer connected');
};

const produceMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

const consumeMessages = async (consumer, topic, handler) => {
  await consumer.connect();
  console.log(`Consumer connected to group: ${consumer.groupId}`);
  await consumer.subscribe({ topic, fromBeginning: true });
  console.log(`Subscribed to topic: ${topic}`);
  await consumer.run({
    eachMessage: async ({ message }) => {
      const parsedMessage = JSON.parse(message.value.toString());
      handler(parsedMessage);
    },
  });
};

module.exports = { initKafka, produceMessage, createConsumer, consumeMessages };
