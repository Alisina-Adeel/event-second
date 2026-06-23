import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    dedupe: ["react-router", "react-router-dom"],
  },
});