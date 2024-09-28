import { io } from "socket.io-client";

export class SocketIOWrapper {

    constructor() {
        this.socket = null;
        this.options = { transports: ["websocket", "polling"] }
    }

    connect() {
        this.socket = io(this.options);
        this.init_socket_event();
    }

    connect_by_url(url) {
        this.socket = io(url, this.options);
        this.init_socket_event();
    }

    disconnect() {
        this.socket.close();
    }

    reconnect() {
        this.socket.open();
    }

    init_socket_event() {
        this.socket.on('connect', () => {
            gml_Script_gmcallback_sio_on_connect();
        });

        this.socket.on('disconnect', () => {
            gml_Script_gmcallback_sio_on_disconnect();
        });
    }

    add_event(name) {
        this.socket.on(name, (data) => {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }

            window[`gml_Script_gmcallback_sio_on_${name}`](-1, -1, data);
        });
    }

    send(name, data) {
        this.socket.emit(name, data);
    }

    get_connection_status() {
        return this.socket.connected;
    }
}

