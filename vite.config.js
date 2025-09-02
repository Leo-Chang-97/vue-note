import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // 開發時為 '/'，production build 時為你的 repo 子目錄
  base: mode === 'production' ? '/vue-note/' : '/',
  plugins: [vue()],
}));
