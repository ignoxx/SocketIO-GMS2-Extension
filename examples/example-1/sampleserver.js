/*
    https://ignoxx.dev/socketio
*/

const server = require('http').createServer()
const io = require('socket.io')(server, { cors: { origin: '*' } });
const port = 3003;

// Listen for incoming connections
server.listen(port, (err) => {
    if (err) throw err
    console.log(`Listening on port ${port}`);
});

const players = [];


class Player {
    constructor(data) {
        this.username = data.username;
        this.socket = data.socket;
        this.x = data.x;
        this.y = data.y;
    }

    get id() {
        return this.socket.id;
    }

    toString() {
        return JSON.stringify({
            username: this.username,
            id: this.id,
            x: this.x,
            y: this.y
        });
    }
}


io.on('connection', (client) => {
    var player;

    // This event will be trigered when the client request to join the game.
    // In this example project, it'll happen after you've entered your username on the client side
    client.on('create_player', (data) => {
        if (player) return;

        data = JSON.parse(data);

        player = new Player({
            socket: client,
            username: data.username,
            x: Math.floor(Math.random() * 700) + 60,
            y: Math.floor(Math.random() * 500) + 60
        });

        // Add to players list
        players.push(player);

        // Creating ourself, just ourself!
        client.emit('create_player', player.toString());

        // Creating ourself for everyone else, ourself NOT included
        client.broadcast.emit('create_player_other', player.toString());

        // Creating everyone else for ourself, ourself NOT included because we already created ourself
        players.filter((p) => p !== player).forEach((p) => client.emit('create_player_other', p.toString()));

        console.log(`Player "${player.username}", with ID: ${player.id} created!`);
    });

    // Broadcast our position to all players, ourself NOT included
    // This is just an example project, we don't care if the client cheats. But you might consider also sending your own position to yourself for security/sync reasons
    // it depends on your project, e.g. if player position is important on client side
    client.on('position_update', (data) => {
        if (!player) return;

        data = JSON.parse(data);

        player.x = data.x;
        player.y = data.y;

        client.broadcast.emit('position_update', player.toString());
    });

    // When a player closes the game or refresh the page, this event will be triggered
    client.on('disconnect', () => {
        if (!player) return;

        // Tell everyone that we disconnected (ourself NOT included, because we already closed the game and we don't care)
        client.broadcast.emit('destroy_player', player.toString());

        //Remove player from list
        const playerIndex = players.indexOf(player);
        if (playerIndex > -1) {
            players.splice(playerIndex, 1);
        }

        console.log(`Player "${player.username}", with ID: ${player.id} disconnected.`);
    });
});

