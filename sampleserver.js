const server = require('http').createServer()
const io = require('socket.io')(server)


server.listen(3000, function (err) {
  if (err) throw err
  console.log('listening on port 3000')
})

io.on('connection', function(client) {
    client.on("Test", (data) => {
        client.emit("Test", data);
        console.log("Received Test ::" + data);
    });
});