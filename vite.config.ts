import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';  // Para resolver alias

export default defineConfig({
  plugins: [react()],
  base: '/docagilsw/',  // ← ¡CLAVE! Apunta al subpath de tu repo en Pages
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // ← Esto hace que @ funcione en runtime
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,  // Sube a 1MB pa' silenciar
  },
});