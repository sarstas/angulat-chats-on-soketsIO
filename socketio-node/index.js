const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
        io.emit('my broadcast', `${msg}`);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


});

http.listen(3000, () => {
    console.log('listeninghttp on *:3000');
});