import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        emptyOutDir: true,
        outDir: "dist",
        lib: {
            entry: "src/index.js",
            name: "SocketIOGMS2",
            formats: ["iife"],
            fileName: () => "gms2.api.js"
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                extend: true
            }
        },
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: false,
                drop_debugger: true,
                passes: 2
            },
            mangle: {
                reserved: ["sio_connect", "sio_connect_by_url", "sio_disconnect", "sio_reconnect", "sio_addEvent", "sio_emit", "sio_get_connection_status"]
            },
            format: {
                comments: false
            }
        }
    }
});

