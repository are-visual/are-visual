import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import fs from 'fs'
import { isNil } from 'lodash-es'
import path from 'path'
import { RollupOptions } from 'rollup'
import del from 'rollup-plugin-delete'
import nodeExternals from 'rollup-plugin-node-externals'
import postcss from 'rollup-plugin-postcss'
import ts from 'rollup-plugin-typescript2'

const getEntry = (packagePath: string, entry?: string) => {
  if (isNil(entry)) {
    return path.resolve(packagePath, 'src/index.ts')
  }
  return path.resolve(packagePath, entry)
}

export function createRollupConfig(packagePath: string): RollupOptions {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(packagePath, './package.json')).toString('utf-8'),
  )

  return {
    input: getEntry(packagePath, packageJson.buildOptions?.entry),
    output: {
      name: packageJson.name,
      format: 'es',
      sourcemap: false,
      dir: path.resolve(packagePath, 'dist'),
      preserveModules: true,
      externalLiveBindings: false,
    },
    external: [
      '@are-visual/styles',
      '@are-visual/portal-hosts',
      '@are-visual/react-hooks',
      '@are-visual/icon',
      '@are-visual/utils',
      '@are-visual/style-inject',
      /^@are-visual\/styles/,
      'lodash-es',
      'react',
      'react-dom',
      'rc-util',
      'rc-motion',
      'clsx',
    ],
    plugins: [
      // @ts-ignore
      del({ targets: `${path.resolve(packagePath, 'dist/*')}` }),
      // @ts-ignore
      postcss({
        extensions: ['.css', '.scss'],
        sourceMap: false,
        minimize: true,
        inject: (cssStr) =>
          `import styleInject from '@are-visual/style-inject';styleInject(${cssStr})`,
      }),
      url(),
      // @ts-ignore
      svgr({
        namedExport: 'ReactComponent',
      }),
      json({
        namedExports: false,
      }),
      ts({
        cwd: packagePath,
        check: false,
        tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
      }),
      nodeExternals(),
      nodeResolve(),
      replace({
        preventAssignment: true,
        __DEV__: `process.env.NODE_ENV !== 'production'`,
      }),
    ],
  }
}
