import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

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
      ],
    },
    plugins: [react()],
  }
})
