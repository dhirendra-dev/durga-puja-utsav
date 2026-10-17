import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/durga-puja-utsav/' : '/',
  plugins: [react()],
  server: { host: '0.0.0.0' },
}))
