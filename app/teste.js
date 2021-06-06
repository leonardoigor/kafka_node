const KafkaServices = require('./Kafka')

const kafkaService = KafkaServices.createKafkaServices('app3')




kafkaService.watch('valid_result', ({ message }) => {
    let data = message.value.toString()
    console.log(data, '--------------------------------------------');
})
