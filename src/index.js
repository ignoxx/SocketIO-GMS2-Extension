import { SocketIOWrapper } from "./socketioWrapper";

const socketio = new SocketIOWrapper();

export function sio_connect() {
    socketio.connect();
}

/**
 * @param {string} url
*/
export function sio_connect_by_url(url) {
    socketio.connect_by_url(url);
}

export function sio_disconnect() {
    socketio.disconnect();
}

export function sio_reconnect() {
    socketio.reconnect();
}

/**
 * @param {string} name
*/
export function sio_addEvent(name) {
    socketio.add_event(name);
}

/**
 * @param {string} name
 * @param {string} data
*/
export function sio_emit(name, data) {
    socketio.send(name, data);
}

/**
 * @returns {bool}
*/
export function sio_get_connection_status() {
    return socketio.get_connection_status();
}
