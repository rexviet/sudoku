import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@engine': path.resolve(__dirname, './src/engine'),
      '@game': path.resolve(__dirname, './src/game'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@styles': path.resolve(__dirname, './src/styles')
    }
  }
})
