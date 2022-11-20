import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: {
      __DEV__: mode !== 'production',
    },
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: `${pathResolve('src')}/`,
        },
        {
          find: '@are-visual/react',
          replacement: `@are-visual/react/src`,
        },
        {
          find: '@are-visual/icon',
          replacement: `@are-visual/icon/src`,
        },
        {
          find: '@are-visual/portal-hosts',
          replacement: `@are-visual/portal-hosts/src`,
        },
        {
          find: '@are-visual/react-hooks',
          replacement: `@are-visual/react-hooks/src`,
        },
        {
          find: '@are-visual/shared',
          replacement: `@are-visual/shared/src`,
        },
        {
          find: '@are-visual/utils',
          replacement: `@are-visual/utils/src`,
        },
      ],
    },
    plugins: [react(), svgr()],
  }
})
