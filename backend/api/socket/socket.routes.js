module.exports = connectSockets
console.log('shh');

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg => {
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('chat name', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('chat typing', userName => {
            socket.broadcast.to(socket.myTopic).emit('chat showTyping', userName)
        })
        socket.on('join station', stationId => {
            console.log(stationId)
            if (socket.myStation) {
                socket.leave(socket.myStation)
            }
            socket.join(stationId)
            socket.myStation = stationId;
        })
    })
}