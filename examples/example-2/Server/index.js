const PORT = 3000;

const server = require('http').createServer();
const io = require('socket.io')(server, { cors: { origin: '*' } });

// Listen for incoming connections
server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening on port.. > ${PORT}`);
});

io.on('connection', (client) => {
    console.log(`New connection.. > '${client.id}'`);

    // Send clients SID
    client.emit('client_id', {
        client_id: client.id
    });

    client.on('login', (data) => {
        console.log(`login event data: > '${data}'`);

        //send same data back
        client.emit("login", data);
    });

    client.on('disconnect', (data) => {
        console.log(`Client disconnected.. > '${client.id}'`);
    });
});