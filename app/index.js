console.log('producer');
const express = require('express')
const app = express()
const KafkaServices = require('./Kafka')

const kafkaService = KafkaServices.createKafkaServices('app1')
// kafkaService.watch('valid_result', ({ message }) => {
//     let data = message.value.toString()
//     console.log(data, '--------------------------------------------');
// })

kafkaService.emit({ status: 'ok' }, 'valid')

app.use((req, res, next) => {
    req.service = kafkaService
    return next()
})




app.get('/', async (req, res) => {
    let service = req.service
    for (let index = 0; index <= 600; index++) {
        service.emit({ status: index }, 'valid')

    }
    console.log('emiting');
    console.log('sengind');
    res.send({ status: 'data' })
})

let port = 5000
app.listen(port, () => {


    console.log('runing', port)
})


// const loginTopicWatch = ({ topic, partition, message }) => {
//     console.log('loginTopicWatch');
//     let data = JSON.parse(message.value.toString())
//     console.log(data);
//     kafkaService.emit({ status: "200" }, 'login_topic_front');
// }

// kafkaService.watch('login_topic', loginTopicWatch)
