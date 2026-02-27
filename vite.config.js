import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production"
    ? "/smart_irrigation_system/"
    : "/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://203.190.12.136',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/smart_irrigation_system/api'),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            // console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // console.log('Proxying request to:', proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // console.log('Received response with status:', proxyRes.statusCode);
          });
        },
      }
    }
  }
}))