import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

interface ProcessEnv {
  [key: string]: string | undefined;
}

declare var process: {
  env: ProcessEnv;
};

const cherryPickedKeys = [
  "REACT_APP_FIREBASE_API_KEY",
  "REACT_APP_FIREBASE_AUTH_DOMAIN",
  "REACT_APP_FIREBASE_PROJECT_ID",
  "REACT_APP_FIREBASE_DATABASE_URL",
  "REACT_APP_FIREBASE_STORAGE_BUCKET",
  "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  "REACT_APP_FIREBASE_APP_ID"
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', 'REACT_APP_FIREBASE_');
  const processEnv = {} as ProcessEnv;
  cherryPickedKeys.forEach(key => processEnv[key] = env[key] as string);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
    server: {
      open: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests",
      mockReset: true,
    },
  }
})
