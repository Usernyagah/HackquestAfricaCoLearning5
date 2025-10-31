import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      // Ignore node_modules and artifacts directories
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/artifacts/**',
        '**/cache/**',
        '**/typechain-types/**',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
      ],
      // Use polling instead of native file system events
      usePolling: true,
      interval: 100,
    },
    hmr: {
      overlay: false
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
