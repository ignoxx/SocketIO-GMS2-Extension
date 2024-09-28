import { defineConfig } from 'vite'
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default defineConfig({
    build: {
        emptyOutDir: true,
        outDir: "dist",
        rollupOptions: {
            input: "src/index.js", // Only bundle the entry point
            output: {
                entryFileNames: "gms2.api.js", // Your desired output name
                format: "cjs", // CommonJS format for compatibility
                exports: "named", // Ensure named exports are preserved
            },
            treeshake: false, // Disable tree-shaking to preserve exports
            plugins: [
                resolve({
                    browser: true, // Resolve for browser environment
                }),
                commonjs(), // Allow importing of CommonJS modules
                babel({
                    babelHelpers: "bundled",
                    presets: ["@babel/preset-env"],
                }),
            ],
        },
        minify: false, // Disable minification for now to avoid issues
    }
});

