import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], server: {
    proxy: {
        '/api': {
            target: 'https://app-94pg.onrender.com', // URL de tu backend
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''), 
        },
    },
},
});