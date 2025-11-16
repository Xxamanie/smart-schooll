import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: Number(process.env.PORT) || 5173,
        host: true,
        proxy: {
          '/api': {
            target: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
            changeOrigin: true,
            secure: false
          }
        }
      },
      plugins: [react(), tsconfigPaths()],
      // Access only public envs via import.meta.env.VITE_*
      // Do not expose secrets via define
      define: {
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
