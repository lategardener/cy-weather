import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Le "base" doit correspondre au nom de votre dépôt GitHub entre slashs
  base: '/cy-weather/',
})