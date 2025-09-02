import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue-note/', // GitHub Pages 專案路徑
  plugins: [vue()],
})
