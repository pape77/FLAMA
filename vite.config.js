import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Web3Forms expects client-side submits. Free tier rate-limits shared server IPs
// (e.g. Cloudflare Functions), so we embed the key at build time for the browser.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const web3formsKey = env.VITE_WEB3FORMS_ACCESS_KEY || env.WEB3FORMS_ACCESS_KEY || ''

  return {
    define: {
      __FLAMA_WEB3FORMS_KEY__: JSON.stringify(web3formsKey),
    },
    plugins: [react(), tailwindcss()],
    server: {
      // OneDrive's virtual filesystem doesn't emit reliable fs events
      watch: { usePolling: true, interval: 300 },
    },
    build: {
      target: 'es2020',
      cssMinify: true,
    },
  }
})
