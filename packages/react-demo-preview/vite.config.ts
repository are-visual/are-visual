import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: {
      __DEV__: mode !== 'production',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@are-visual/icon': '@are-visual/icon/src',
        '@are-visual/portal-host': '@are-visual/portal-host/src',
        '@are-visual/react': '@are-visual/react/src',
        '@are-visual/shared': '@are-visual/shared/src',
        '@are-visual/utils': '@are-visual/utils/src',
        '@are-visual/styles': '@are-visual/styles/src',
      },
    },
    plugins: [react(), svgr()],
  }
})
