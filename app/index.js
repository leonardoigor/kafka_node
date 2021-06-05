console.log('producer');
const KafkaServices = require('./Kafka')

const { Kafka } = require('kafkajs')


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const kafkaService = KafkaServices.createKafkaServices()

kafkaService.watch('login_topic')
