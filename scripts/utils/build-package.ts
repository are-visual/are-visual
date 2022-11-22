import chalk from 'chalk'
import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

import { compile } from './compile'
import { copyPackageJson } from './copy-package-json'
import { createRollupConfig } from './create-rollup-config'
import Logger from './logger'

function createTask(cmd: string, cwd?: string) {
  return new Promise<void>((resolve, reject) => {
    const prebuild = childProcess.spawn(cmd, {
      shell: true,
      stdio: 'inherit',
      cwd,
    })
    prebuild.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(Error('compile fail.'))
      }
    })
  })
}

export async function buildPackage(name: string, packagePath: string) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(packagePath, './package.json')).toString('utf-8'),
  )
  const log = new Logger(packageJson.name)

  const { buildOptions } = packageJson
  if (buildOptions) {
    if (buildOptions.prebuild) {
      await createTask(`pnpm -F ${packageJson.name} ${buildOptions.prebuild}`)
    }
    if (buildOptions.build) {
      await createTask(`pnpm -F ${packageJson.name} ${buildOptions.build}`)
    }
    if (buildOptions.build && buildOptions.postbuild) {
      await createTask(`pnpm -F ${packageJson.name} ${buildOptions.postbuild}`)
    }
    if (buildOptions.build) {
      return
    }
  }

  log.info('start compiling')
  const startTime = Date.now()
  compile(createRollupConfig(packagePath))
    .then(() => {
      if (!buildOptions.postbuild) return
      return createTask(`pnpm -F ${packageJson.name} ${buildOptions.postbuild}`)
    })
    .then(() => {
      copyPackageJson(packagePath)
      log.info(
        `Package ${chalk.cyan(packageJson.name)} was built in ${chalk.green(
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
