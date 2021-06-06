const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
})
const KafkaServices = require('./src/Kafka')


const kafkaService = KafkaServices.createKafkaServices()

io.on('connect', socket => {
    console.log('connect');
    socket.on('form_request', req => {
        kafkaService.emit(req, 'login_topic')
        console.log('emited');
    })
})
let port = 3002

console.log('chegou');
http.listen(port, () => console.log(`${port}`))