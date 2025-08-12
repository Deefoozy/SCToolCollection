import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.spec.js'],
    includeSource: ['src/lib/**/*.spec.js'],
    coverage: {
      include: ['src/lib/**'],
      exclude: ['**/node_modules/**', '**/tests/**'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
