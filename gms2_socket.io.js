/*
    Gamemaker: Studio 2 Socket.io extension 
    Author: Ignas Kavaliauskas (Inspired by Ivan Fonseca)
    github.com/ignasKavaliauskas/..
*/

// Small wrapper of Socket.io class for GM:S 2
class SocketIO {

    constructor(){
        this.socket;
        this.ip;
        this.port;
    }

    Connect(ip, port){
        this.ip = ip;
        this.port = port;

        this.socket = io.connect(`http://${this.ip}:${this.port}`);

        this.socket.on('connect' , () => {
            gml_Script_gmcallback_sio_onConnect();
        }); 

        this.socket.on('disconnect' , () => {
            gml_Script_gmcallback_sio_onDisconnect();
        }); 
    }

    Disconnect(){
        this.socket.close();
    }

    Reconnect(){
        this.socket.open();
    }

    AddEvent(name){
        this.socket.on(name, (data) => {
            window[`gml_Script_gmcallback_sio_on${name}`](-1, -1, data);
        });
    }

    Send(name, data){
        this.socket.emit(name, data);
    }
}

// API for GM:S 2
const socketio = new SocketIO();

function sio_connect(ip, port){
    socketio.Connect(ip, port);
}

function sio_disconnect(){
    socketio.Disconnect();
}

function sio_addEvent(name){
    socketio.AddEvent(name);
}

function sio_emit(name, data){
    socketio.Send(name, data);
}

sio_connect("localhost", 3000);
sio_addEvent("Test");