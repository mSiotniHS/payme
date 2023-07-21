import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [solidPlugin()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      { find: '@service', replacement: fileURLToPath(new URL("./src/service", import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL("./src/components", import.meta.url)) },
      { find: '@views', replacement: fileURLToPath(new URL("./src/views", import.meta.url)) },
    ]
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
}));
