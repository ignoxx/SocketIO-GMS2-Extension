# SocketIO-GMS2-Extension
Socket.io extension for GameMaker: Studio 2 HTML5 (GameMaker: Studio 1.4 Support available now!) [Preview on YouTube](https://youtu.be/HyOxkqNxDG0)
Download it from [releases](https://github.com/IgnasKavaliauskas/SocketIO-GMS2-Extension/releases)

# Features
[Socket.IO](https://github.com/socketio/socket.io) enables real-time, bidirectional and event-based communication. It works on every platform, browser or device, focusing equally on reliability and speed.

This is a intuitive [Game Maker Studio: 2](https://www.yoyogames.com/gamemaker) extension which enables fast Socket.IO communication for the client!

# Requirements
* Game Maker Studio: 2 with the HTML5 module.
* This extension

# Installation
* Import this extension
* Done! 
You don't need any objects which initializes the extension or anything else. Just call `sio_connect(ip:string, port:int)` in order to connect to the server, that's all! :)

I recommend you to check out the [Example project](https://github.com/IgnasKavaliauskas/SocketIO-GMS2-Extension/tree/master/Example) to get started.

# API
#### `sio_connect(ip:string, port:int)`
Call it before you call any other function. This connects you to the specified server.

#### `sio_disconnect()`
Closes the current connection

#### `sio_reconnect()`
In case you've disconnected for whatever reason, you can use this function to reconnect to the server. (It will use the provided address from `sio_connect(ip:string, port:int)`

#### `sio_addEvent(eventName:string)`
Creates a new event. After adding a new event, we need to create a callback for this event.
**ATTENTION** you have to follow this naming scheme: `gmcallback_sio_on_**eventName**`. Where `**eventName**` is replaced by the name you have specified above as an argument. Event names are always **lowercase**.

**_Example:_**
```
sio_addEvent("create_player");

create a new GML script: gmcallback_sio_on_create_player(argument0:string)
```
The callback script contains one argument `argument0`, which is the packet data received from the server. 
In order to use the data you've to decode the JSON string to DS Map. 

**_Example:_**
```
# gmcallback_sio_on_create_player.gml

// Decode the received JSON string to DS Map
var data = json_decode(argument[0]);

// Access our data
var username = data[? "username"];
var playerID = data[? "id"];
var health = real(data[? "health"]);
..
```

#### `sio_emit(eventName:string, data:string)`
Send your data to the server. `eventName` is **lowercase!** `data` has to be a _JSON-string_. 
In order to send a packet, I recommend you to follow the example below.

**_Example:_**
```
# sio_emit_create_player.gml
var eventName = "create_player";
var username = "Destroyer123";

// This is our packet
var data = ds_map_create();
  data[? "username"] = username;
  data[? "x"] = x;
  data[? "y"] = y;
  sio_emit(eventName, json_encode(data));
ds_map_destroy(data);

```

#### `sio_get_connection_status()`
`@return: boolean`
If the game client is connected to the server it will return `true` otherwise, if it's not connected to the server, `false`

# Missing anything?
Feel free to create a new issue or make a pull request, in case you solved your problem by yourself!
