import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  // Define default values for PORT and HOST
  const PORT = Number(env.VITE_PORT) || 3030; // Set to 3030 to match your logs
  const HOST = env.VITE_HOST || 'localhost';

  return {
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"', // Correct pattern
          dev: {
            logLevel: ['error'],
          },
        },
        overlay: {
          position: 'tl',
          initialIsOpen: false,
        },
      }),
    ],
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'node_modules'),
      },
    },
    server: {
      port: PORT,
      host: HOST,
    },
    preview: {
      port: PORT,
      host: HOST,
    },
  };
});
