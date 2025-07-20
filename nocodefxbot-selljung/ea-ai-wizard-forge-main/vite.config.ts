import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // แก้ไขการตั้งค่า title
  appType: 'spa',
  base: '/',
  server: {
    port: 8080
  },
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    })
  ]
})
