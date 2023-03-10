const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (sock) => {
    sock.emit('message', 'You are connected');

    sock.on('message', (text) => io.emit('message', text));
    sock.on('turn', ({ x, y }) => io.emit('turn', { x, y }));
})

server.on('error', (err) => {
    console.error(err);
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});