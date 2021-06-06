console.log('api2');
const KafkaServices = require('./Kafka')

const kafkaService = KafkaServices.createKafkaServices('app2')


kafkaService.watch('valid', ({ message }) => {
    let data = message.value.toString()
    console.log(data, 'chegouc api 2');

    kafkaService.emit({ data }, 'valid_result')
})


// kafkaService.watch('valid_result', ({ message }) => {
//     let data = message.value.toString()
//     console.log(data, '--------------------------------------------');
// })
