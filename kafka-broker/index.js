import Kafka, { Consumer } from 'kafka-node';
import Producer from './handler/producer.js';

const client = new Kafka.KafkaClient();
const producer = new Producer();
const consumer = new Consumer(client, [], { encoding: 'utf8', fromOffset: false, autoCommit: true });

producer.createTopics(['test', 'test1']).then((value) => {
  console.log(value);
}).then(() => producer.produce('test', 'message test')).then((value) => {
  console.log(value);
})
  .catch((error) => {
    console.log(error);
  });

consumer.addTopics(['test', 'test1'], (error) => {
  console.log(error);
});

consumer.on('message', (message) => {
  console.log(message);
});
