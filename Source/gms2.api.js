/*
    Gamemaker: Studio 2 Socket.io extension 
    Author: Ignas Kavaliauskas (Inspired by Ivan Fonseca)
    https://github.com/IgnasKavaliauskas/SocketIO-GMS2-Extension
*/

// Small wrapper of Socket.io for GM:S 2
class SocketIO {

    constructor() {
        this.socket;
        this.ip;
        this.port;
    }

    connect(ip, port) {
        this.ip = ip;
        this.port = port;

        this.socket = io.connect(`http://${this.ip}:${this.port}`);

        this.socket.on('connect', () => {
            gml_Script_gmcallback_sio_on_connect();
        });

        this.socket.on('disconnect', () => {
            gml_Script_gmcallback_sio_on_disconnect();
        });
    }

    disconnect() {
        this.socket.close();
    }

    reconnect() {
        this.socket.open();
    }

    addEvent(name) {
        this.socket.on(name, (data) => {
            if (typeof data === 'object')
                data = JSON.stringify(data);

            window[`gml_Script_gmcallback_sio_on_${name.toLowerCase()}`](-1, -1, data);
        });
    }

    send(name, data) {
        this.socket.emit(name.toLowerCase(), data);
    }

    getConnectionStatus() {
        return this.socket.connected;
    }
}

// API for GM:S 2
const socketio = new SocketIO();

function sio_connect(ip, port) {
    socketio.connect(ip, port);
}

function sio_disconnect() {
    socketio.disconnect();
}

function sio_reconnect() {
    socketio.reconnect();
}

function sio_addEvent(name) {
    socketio.addEvent(name);
}

function sio_emit(name, data) {
    socketio.send(name, data);
}

function sio_get_connection_status() {
    return socketio.getConnectionStatus();
}
