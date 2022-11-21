import chalk from 'chalk'
import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

import { compile } from './compile'
import { copyPackageJson } from './copy-package-json'
import { createRollupConfig } from './create-rollup-config'
import Logger from './logger'

export function buildPackage(name: string, packagePath: string) {
  const log = new Logger(name)
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(packagePath, './package.json')).toString('utf-8'),
  )

  const { buildOptions } = packageJson
  if (buildOptions && buildOptions.cmd) {
    childProcess.spawn(`pnpm -F ${packageJson.name} ${buildOptions.cmd}`, {
      shell: true,
      stdio: 'inherit',
    })
    return
  }

  log.info('start compiling')
  const startTime = Date.now()
  compile(createRollupConfig(packagePath))
    .then(() => {
      copyPackageJson(packagePath)
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
