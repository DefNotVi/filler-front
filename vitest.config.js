import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simula el navegador en la consola
    globals: true,        // Permite usar 'describe' y 'test' sin importarlos en cada archivo
  },
});