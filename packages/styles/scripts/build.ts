import chalk from 'chalk'
import path from 'path'

import { compile as rollupCompile } from '../../../scripts/utils/compile'
import Logger from '../../../scripts/utils/logger'
import { createRollupConfig } from './create-rollup-config'
import { getAllFile } from './get-all-file'

const log = new Logger('styles')

const resolveDir = (...pathName: string[]) => {
  return path.resolve(__dirname, '../', ...pathName)
}

const getDir = (...pathName: string[]) => {
  return path.join(__dirname, '../', ...pathName)
}

function compile() {
  const filePathList = getAllFile(resolveDir('src'), (fileName) => {
    const extName = fileName.substring(fileName.lastIndexOf('.') + 1)
    return extName === 'ts'
  })
  if (filePathList.length <= 0) {
    log.error('no files to compile.')
    return Promise.resolve()
  }
  const asyncTask = filePathList.map((pathName) => {
    const modulePath = pathName.split('src')[1]
    const dirName = modulePath.substring(0, modulePath.lastIndexOf('/'))
    log.info(`${modulePath} ${chalk.cyan('start compiling...')}`)
    return rollupCompile(createRollupConfig(pathName, getDir('dist', dirName)))
  })
  return Promise.all(asyncTask)
}

compile().then(() => {
  log.success('Compilation completed.')
})
