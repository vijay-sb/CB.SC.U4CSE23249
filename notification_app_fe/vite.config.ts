import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'logging-middleware': path.resolve(__dirname, '../logging_middleware/src/index.ts')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/evaluation-service': {
        target: 'http://20.207.122.201',
        changeOrigin: true,
      }
    }
  },
})
