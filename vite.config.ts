// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Reemplaza con tu usuario y repo de GitHub
const repoName = "docagilsw";

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
});
