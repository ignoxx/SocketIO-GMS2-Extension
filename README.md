# gm-socketio

Socket.IO extension for GameMaker: Studio 2.3 HTML5  
[Preview on YouTube](https://youtu.be/HyOxkqNxDG0) | [Download latest release](https://github.com/ignoxx/gm-socketio/releases)

_Working with GameMaker: Studio 1.4 too, but won't be updated in the marketplace._

## Features

[Socket.IO](https://github.com/socketio/socket.io) enables real-time, bidirectional and event-based communication. It works on every platform, browser or device, focusing equally on reliability and speed.

This is an intuitive [Game Maker Studio: 2](https://www.yoyogames.com/gamemaker) extension which enables fast Socket.IO communication for the client!

## Quick Start

### GML (GameMaker Client)

```gml
// 1. Connect to server
sio_connect_by_url("http://localhost:3000");

// 2. Add event listener (creates callback)
sio_addEvent("player_joined");

// 3. Send data to server
sio_emit("move", json_encode({x: x, y: y}));
```

### JavaScript (Node.js Server)

```javascript
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  
  socket.on('move', (data) => {
    // Broadcast to all other players
    socket.broadcast.emit('player_moved', data);
  });
});
```

See the `/examples` folder for more complete working examples including multiplayer movement and chat.

## Installation

1. Import the extension into your GameMaker project
2. Call `sio_connect()` or `sio_connect_by_url(url)` to connect
3. Done! No initialization objects needed.

Check out the [examples](https://github.com/ignoxx/gm-socketio/tree/master/examples) to get started.

## API Reference

### `sio_connect()`

Connects to `window.location`. Call this before using other extension functions.

### `sio_connect_by_url(url)`

Connect to a specific server URL instead of window.location.

### `sio_disconnect()`

Closes the current connection.

### `sio_reconnect()`

Reconnect using the previous address. Note: Socket.IO auto-reconnects by default, so you rarely need to call this manually.

### `sio_addEvent(eventName)`

Creates an event listener. You **must** create a callback script following this naming convention:

**Script name:** `gmcallback_sio_on_EVENTNAME` (replace EVENTNAME with your event name, case sensitive)

**Example:**
```gml
// Register the event listener
sio_addEvent("create_player");

// Create a script named: gmcallback_sio_on_create_player
// Content:
var data = json_decode(argument[0]);
var username = data[? "username"];
var playerID = data[? "id"];
```

The callback receives `argument[0]` containing the data from the server. JSON objects are automatically converted to JSON strings.

### `sio_emit(eventName, data)`

Send data to the server. Event name is case sensitive.

```gml
var map = ds_map_create();
map[? "username"] = "Player1";
map[? "x"] = x;
map[? "y"] = y;
sio_emit("create_player", json_encode(map));
ds_map_destroy(map);
```

### `sio_get_connection_status()`

Returns `true` if connected to the server, `false` otherwise.

## Development

```bash
# Install dependencies
yarn install

# Build the extension
yarn build

# Test the build (starts test server)
yarn test

# Clean build artifacts
yarn clean
```

## Server Requirements

- Socket.IO server v4.x (compatible with socket.io-client v4.x bundled in this extension)
- See `/test/server.js` for a minimal working example

## Resources

- [Example projects](https://github.com/ignoxx/gm-socketio/tree/master/examples)
- [Getting started blog post](https://medium.com/@ignoxx/create-a-io-game-using-game-maker-studio-2-and-node-js-part-1-f591781bcd17)

## License

MIT
