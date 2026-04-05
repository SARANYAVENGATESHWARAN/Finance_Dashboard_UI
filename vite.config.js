import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'finvault' below with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base:  '/Finance_Dashboard_UI_1/',
})
