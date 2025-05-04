import { defineConfig } from 'vite'
// Importing Tailwind CSS and React plugins for Vite
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Base configuration for Vite
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Proxy target for API requests (whenever using /api in the frontend, it will be proxied to this target)
      }
    }
  }
})
