import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import fs from 'fs-extra'
import path from 'path'
import { OutputOptions, Plugin, RollupOptions } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import nodeExternals from 'rollup-plugin-node-externals'
import typescript from 'rollup-plugin-typescript2'
import visualizer from 'rollup-plugin-visualizer'
import ttypescript from 'ttypescript'

interface PkgConfig {
  basePath: string
  format: string
  entry?: string
  publicPath?: string
  externals?: string[]
  sourcemap: boolean
  minify: boolean
  analyze: boolean
}

export default async function createRollupConfig(
  config: PkgConfig,
): Promise<RollupOptions> {
  const packageJson = JSON.parse(
    fs
      .readFileSync(path.join(config.basePath, './package.json'))
      .toString('utf-8'),
  )

  const output: Record<string, OutputOptions> = {
    es: {
      name: packageJson.name,
      format: 'es',
      externalLiveBindings: false,
      sourcemap: config.sourcemap,
      dir: path.resolve(config.basePath, 'dist/esm'),
      preserveModules: true,
    },
    cjs: {
      name: packageJson.name,
      format: 'cjs',
      externalLiveBindings: false,
      sourcemap: config.sourcemap,
      dir: path.resolve(config.basePath, 'dist/cjs'),
      preserveModules: true,
      exports: 'named',
    },
    umd: {
      name: packageJson.name,
      format: 'umd',
      externalLiveBindings: false,
      sourcemap: config.sourcemap,
      file: path.resolve(config.basePath, 'dist/lib/index.umd.js'),
      globals: {
        react: 'React',
        dayjs: 'dayjs',
        'react-dom': 'ReactDOM',
      },
    },
  }

  console.log(path.resolve(process.cwd(), 'packages/utils/src'))

  const plugins: Plugin[] = [
    json(),
    commonjs(),
    // typescript({
    //   useTsconfigDeclarationDir: true,
    //   typescript: ttypescript,
    //   // tsconfig: path.resolve(process.cwd(), 'tsconfig.build.json'),
    // }),
    nodeExternals(),
    nodeResolve(),
    esbuild({
      minify: config.format === 'umd',
      sourceMap: false,
      // tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
    }),
    alias({
      entries: [
        {
          find: new RegExp(`^${'@are-visual/utils'}`),
          replacement: path.resolve(process.cwd(), 'packages/utils/src'),
        },
      ],
    }),
    replace({ preventAssignment: true }),
  ]

  if (config.analyze && config.format === 'es') {
    plugins.push(
      visualizer({
        title: packageJson.name,
        filename: path.join(config.basePath, 'lib/stats.html'),
        projectRoot: path.join(config.basePath, 'src'),
        sourcemap: true,
        gzipSize: true,
      }),
      visualizer({
        title: packageJson.name,
        filename: path.join(config.basePath, 'lib/stats.json'),
        projectRoot: path.join(config.basePath, 'src'),
        json: true,
        sourcemap: true,
        gzipSize: true,
      }),
    )
  }

  return {
    input:
      config?.entry ||
      path.resolve(config.basePath, packageJson.buildOptions.entry) ||
      path.resolve(config.basePath, 'src/index.ts'),
    output: output[config.format],
    external: [],
    plugins,
  }
}
