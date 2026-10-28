import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // No GitHub Pages o site fica em haayeska.github.io/Calculadora/
  base: '/Calculadora/',
  plugins: [react(), tailwindcss()],
})
