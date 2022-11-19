import chalk from 'chalk'

import { compile } from './compile'
import { createRollupConfig } from './create-rollup-config'
import Logger from './logger'

export function buildPackage(name: string, packagePath: string) {
  const log = new Logger(name)
  log.info('start compiling')
  const startTime = Date.now()
  compile(createRollupConfig(packagePath))
    .then(() => {
      log.info(
        `Package ${chalk.cyan(packagePath)} was built in ${chalk.green(
          `${((Date.now() - startTime) / 1000).toFixed(2)}s`,
        )}`,
      )
      log.success('Compilation completed.')
    })
    .catch((error) => {
      console.error(error)
      log.error(error)
    })
}
