import chalk from 'chalk'
import execa from 'execa'

import compile from './compile'
import createRollupConfig from './create-rollup-config'
import generateDts from './generate-dts'
import Logger from './logger'

export interface BuildOptions {
  analyze: boolean
  sourcemap: boolean
  minify: boolean
  formats: string[]
}

const logger = new Logger('build-package')

function startCompile(rest: Array<() => Promise<void>>) {
  const stack = rest
  return new Promise((resolve) => {
    stack.push(() => {
      resolve(undefined)
      return Promise.resolve()
    })
    stack.reduce((caller, next) => caller.then(next), Promise.resolve())
  })
}

export async function buildPackage(
  packagePath: string,
  options?: BuildOptions,
) {
  const { formats = [] } = options || {}
  logger.info(`Building package ${chalk.cyan(packagePath)}`)
  const startTime = Date.now()
  await generateDts(packagePath)

  startCompile(
    formats.map((format) => {
      return async () => {
        const config = await createRollupConfig({
          ...options,
          basePath: packagePath,
          format,
        })
        logger.info(`Building to ${chalk.cyan(format)} format...`)
        await compile(config)
      }
    }),
  ).then(() => {
    logger.info(
      `Package ${chalk.cyan(packagePath)} was built in ${chalk.green(
        `${((Date.now() - startTime) / 1000).toFixed(2)}s`,
      )}`,
    )
  })
}
