import socketio from 'socket.io';

export type PlayerData = {
    socket: socketio.Socket;
    username: string;
    x: number;
    y: number;
}

export class Player {
    socket: socketio.Socket;
    username: string;
    x: number;
    y: number;

    constructor(data: PlayerData) {
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
            x: this.x,
            y: this.y,
            id: this.id
        });
    }
}
