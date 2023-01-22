import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const baseURL = process.env.NODE_ENV === 'production' ? '/bronevik/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: baseURL
})
