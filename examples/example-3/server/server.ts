import socketio from 'socket.io';
import http from 'http';
import { Player } from './player';

type CreatePlayerData = {
    username: string;
}

export class Server {
    private server: http.Server;
    private io: socketio.Server;
    private port: number;

    private players: Map<string, Player> = new Map();

    constructor(port: number) {
        this.port = port;
        this.server = http.createServer();
        this.io = new socketio.Server(this.server, { cors: { origin: '*' } });

        this.io.on('connection', this.onConnection.bind(this));
    }

    listen() {
        this.server.listen(this.port);

        console.log(`Listening on port ${this.port}`)
    }

    onConnection(client: socketio.Socket) {

        console.log(`Client connected: ${client.id}`);

        client.on('create_player', (data: string) => {
            const parsedData = JSON.parse(data) as CreatePlayerData;

            const player = new Player({
                ...parsedData,
                x: Math.floor(Math.random() * 700) + 60,
                y: Math.floor(Math.random() * 500) + 60,
                socket: client
            });

            this.players.set(player.id, player);

            // Creating ourself, just ourself!
            client.emit('create_player', player.toString());

            // Creating ourself for everyone else, ourself NOT included
            client.broadcast.emit('create_player_other', player.toString());

            // Creating everyone else for ourself, ourself NOT included because we already created ourself
            Array.from(this.players.values()).filter(p => p.id != player.id).forEach(p => {
                client.emit('create_player_other', p.toString());
            });

            console.log(`Player "${player.username}", with ID: ${player.id} created!`);
        });

        client.on('position_update', (data: string) => {
            const player = this.players.get(client.id);

            if (player) {
                const parsedData = JSON.parse(data) as { x: number, y: number };

                player.x = parsedData.x;
                player.y = parsedData.y;

                client.broadcast.emit('position_update', player.toString());
            }
        });

        client.on('disconnect', () => {
            const player = this.players.get(client.id);

            if (player) {
                // Tell everyone that we disconnected (ourself NOT included, because we already closed the game and we don't care)
                client.broadcast.emit('destroy_player', player.toString());

                //Remove player from list
                this.players.delete(player.id);
            }
        });
    }
}

