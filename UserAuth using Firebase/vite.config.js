import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default {
  server: {
    port: 8000,         // or whatever port you want to expose
    host: '0.0.0.0',    // This allows the app to be accessible from outside the container
    strictPort: true,   // This is optional
  },
};

