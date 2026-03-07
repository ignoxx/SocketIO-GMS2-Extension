// Simple test server for SocketIO-GMS2-Extension
const server = require('http').createServer()
const io = require('socket.io')(server, { cors: { origin: '*' } });
const port = 3000;

server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Test server running on http://localhost:${port}`);
    console.log('');
    console.log('To test:');
    console.log('1. Open test/index.html in a browser');
    console.log('   OR serve this directory: npx serve test/');
    console.log('');
});

io.on('connection', (client) => {
    console.log(`✅ Client connected: ${client.id}`);
    
    // Echo back any test messages
    client.on('test_event', (data) => {
        console.log(`📨 Received test_event from ${client.id}:`, data);
        client.emit('test_response', { 
            received: true, 
            originalData: data,
            timestamp: new Date().toISOString()
        });
    });
    
    // Echo any other events back to sender
    client.onAny((event, data) => {
        console.log(`📨 Event '${event}' from ${client.id}:`, data);
    });
    
    client.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${client.id}`);
    });
});