/*
    Gamemaker: Studio 2 Socket.io extension 
    Author: Ignas Kavaliauskas
    https://github.com/IgnasKavaliauskas/SocketIO-GMS2-Extension
*/
const server = require('http').createServer()
const io = require('socket.io')(server)
const port = 3000;

// Listen for incoming connections
server.listen(port, (err) => {
  if (err) throw err
  console.log(`Listening on port ${port}`);
});

var clients = {}; // all connected clients will be stored here
var clientId = 0; // unique ID for every client

io.on('connection', (client) => {
    var playerId = clientId++;

    clients[playerId] = {}; // Player specific dictionary, we store all his values here
    
    client.on('create_player', (data) => {
        data = JSON.parse(data);
        console.log(`Client "${data.username}", with ID: ${playerId} created!`);

        // Apply/generate player data
        clients[playerId].username = data.username;
        clients[playerId].id = playerId;
        clients[playerId].x = Math.floor(Math.random() * 700) + 60;
        clients[playerId].y = Math.floor(Math.random() * 500) + 60;

        // Tell ourself that we joined
        client.emit('create_player', JSON.stringify(clients[playerId]));

        //Broadcast to all clients that we joined, ourself NOT included
        client.broadcast.emit('create_player_other', JSON.stringify(clients[playerId]));

        //Tell ourself which players are connected right now
        for(let key in Object.keys(clients)){
            let value = clients[key];

            //We don't want to get our own data again, skip ourself..
            if(value != undefined && key != playerId){
                client.emit('create_player_other', JSON.stringify(value));
            }
        }
    });

    // Broadcast our position to all players
    client.on('position_update', (data) => {
        data = JSON.parse(data);
        clients[playerId].x = data.x;
        clients[playerId].y = data.y;

        client.broadcast.emit('position_update', JSON.stringify(clients[playerId]));
    });

    // Remove player from our clients dictionary
    client.on('disconnect', () => {
        console.log(`Client "${clients[playerId].username}", with ID: ${clients[playerId].id} disconnected.`);

        // Tell everyone that we disconnected (ourself NOT included)
        client.broadcast.emit('destroy_player', JSON.stringify(clients[playerId]));
        delete clients[playerId];
    });
});