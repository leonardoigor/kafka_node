const { Kafka } = require('kafkajs')

module.exports = class KafkaServices {
    /**  @variation {Kafka} kafka*/
    kafka
    constructor() {
        this.connect()
    }
    connect() {
        const { Kafka } = require('kafkajs')

        this.kafka = new Kafka({
            clientId: 'login',
            brokers: ['localhost:9092', 'localhost:9092', 'localhost:9092']
        })
    }
    async watch(topic) {
        const consumer = this.kafka.consumer({ groupId: 'login-group' })

        await consumer.connect()
        await consumer.subscribe({ topic, fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(topic, partition, {
                    value: message.value.toString(),
                })
            },
        })
    }
    async emit(data, topic) {
        const producer = this.kafka.producer()

        await producer.connect()
        await producer.send({
            topic: topic,
            messages: [
                { value: JSON.stringify(data) },
            ],
        })

        await producer.disconnect()
    }

    static createKafkaServices() {
        let instance = new KafkaServices()
        return instance
    }
}