module.exports = connectSockets
console.log('shh');
console.log('hi!!')

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
                if (socket.myStation) {
                    socket.leave(socket.myStation)
                }
                socket.join(stationId)
                socket.myStation = stationId;
                io.to(socket.myStation).emit('joined new station', stationId)
            })
            // socket.on('set currSong', ({ currSong }, { currStation }) => {
            //     console.log('currSong: ', currSong)
            //     console.log('currStation: ', currStation)
            //     if (socket.myStation === currStation) {
            //         io.to(socket.myStation).emit('song changed', currSong)
            //     }
            // })
    })
}