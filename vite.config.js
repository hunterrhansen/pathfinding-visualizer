import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/visualizer/', // This is the base path for your website.
  plugins: [react()]
})
