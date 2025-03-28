import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Change "firebase" to "src" for better structure
    },
  },
  test: {
    globals: true, 
    environment: "jsdom", //
    setupFiles: "./src/setupTests.js",
  },
  
});
