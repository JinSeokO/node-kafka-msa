import Kafka from 'kafka-node';

const client = new Kafka.KafkaClient();

const initializeProducer = () => {
  const producer = new Kafka.Producer(client);

  return new Promise(((resolve) => {
    producer.on('ready', (error) => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
      resolve(producer);
      console.log('kafka-broker producer on');
    });

    producer.on('error', ((error) => {
      console.error('producer error', error);
    }));
  }));
};

const ProducerService = function ProducerService() {
  this.readyProducer = initializeProducer();
};

ProducerService.prototype.produce = function produce(topic,
  messages,
  partition = 0) {
  const payload = {
    topic,
    messages,
    partition,
  };
  return this.readyProducer.then((producer) => new Promise((resolve, reject) => {
    producer.send([payload], ((error, data) => {
      if (error) {
        console.log('error occurred while produce');
        reject(error);
      }
      resolve(data);
    }));
  }));
};

ProducerService.prototype.createTopics = function createTopics(topics) {
  return this.readyProducer.then((producer) => new Promise(((resolve, reject) => {
    producer.createTopics(topics, (error, data) => {
      if (error) {
        console.log('error occurred while create topics');
        reject(error);
      }
      resolve(data);
    });
  }))).catch((reason) => {
    console.log(reason);
  });
};

export default ProducerService;
