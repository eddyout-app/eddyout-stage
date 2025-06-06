import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Proxy API requests to the server
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "http://localhost:3001", // Proxy auth requests to the server
      },
    },
  },
  build: {
    outDir: "../dist", // Output the build files to the `dist` folder in the root directory (one level up from `client`)
  },
});
