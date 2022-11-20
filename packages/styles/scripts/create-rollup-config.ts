import url from '@rollup/plugin-url'
import path from 'path'
import { RollupOptions } from 'rollup'
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'

export function createRollupConfig(
  entry: string,
  outputDir: string,
): RollupOptions {
  return {
    input: entry,
    output: {
      format: 'esm',
      sourcemap: false,
      dir: outputDir,
      preserveModules: false,
      externalLiveBindings: false,
    },
    external: ['@are-visual/style-inject'],
    plugins: [
      // @ts-ignore
      del({ targets: `${path.resolve(__dirname, '../dist/*')}` }),
      // @ts-ignore
      postcss({
        extensions: ['.css', '.scss'],
        sourceMap: false,
        minimize: true,
        inject: (cssStr) =>
          `import styleInject from '@are-visual/style-inject';styleInject(${cssStr})`,
      }),
      url(),
    ],
  }
}
