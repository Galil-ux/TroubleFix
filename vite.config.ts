
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Bridges the environment variable into the production build
      // Supports both API_KEY and GEMINI_API_KEY
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.GEMINI_API_KEY),
      'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY)
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      emptyOutDir: true
    },
    server: {
      port: 3000,
      host: true
    }
  };
});
