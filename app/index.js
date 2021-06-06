console.log('producer');
const KafkaServices = require('./Kafka')

const { Kafka } = require('kafkajs')



const kafkaService = KafkaServices.createKafkaServices()

const loginTopicWatch = ({ topic, partition, message }) => {
    let data = JSON.parse(message.value.toString())
    console.log(data);
}

kafkaService.watch('login_topic', loginTopicWatch)
