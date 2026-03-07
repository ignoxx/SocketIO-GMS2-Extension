import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: false,
    lib: {
      entry: "src/index.js",
      name: "SocketIOGMS2",
      formats: ["iife"],
      fileName: () => "gms2.api.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        extend: true,
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        side_effects: true,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        unused: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        typeofs: true,
        loops: true,
        sequences: true,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
        reserved: [
          "sio_connect",
          "sio_connect_by_url",
          "sio_disconnect",
          "sio_reconnect",
          "sio_addEvent",
          "sio_emit",
          "sio_get_connection_status",
          "SocketIOGMS2",
        ],
      },
      format: {
        comments: false,
        ecma: 2020,
      },
      ecma: 2020,
      module: false,
      toplevel: true,
    },
    target: "es2020",
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
  },
});

