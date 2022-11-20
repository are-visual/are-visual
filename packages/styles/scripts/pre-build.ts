import fs from 'fs'
import path from 'path'

import Logger from '../../../scripts/utils/logger'
import { getAllFile } from './get-all-file'

const log = new Logger('prebuild:styles')

const resolveDir = (...pathName: string[]) => {
  return path.resolve(__dirname, '../', ...pathName)
}

function emptyDir(pathName: string) {
  const files = fs.readdirSync(pathName)
  files.forEach((file) => {
    const filePath = `${pathName}/${file}`
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      emptyDir(filePath)
    } else {
      fs.unlinkSync(filePath)
    }
  })
}

function writeFile(pathName: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const lastPath = pathName.substring(0, pathName.lastIndexOf('/'))
    fs.mkdir(lastPath, { recursive: true }, (err) => {
      if (err) {
        reject(err)
        return
      }
      fs.writeFile(pathName, data, (err2) => {
        if (err2) {
          reject(err2)
          return
        }
        resolve()
      })
    })
  })
}

/**
 * create .ts file, import scss file.
 */
function preBuild() {
  const filePathList = getAllFile(resolveDir('assets'), (fileName) => {
    const extName = fileName.substring(fileName.lastIndexOf('.') + 1)
    return extName === 'scss'
  })
  if (filePathList.length <= 0) {
    log.error('no files to compile.')
    return Promise.resolve()
  }
  if (fs.existsSync(resolveDir('src'))) {
    emptyDir(resolveDir('src'))
  }
  const asyncTask = filePathList.map((pathName) => {
    const modulePath = pathName.split('assets')[1]
    const prefix = Array(
      modulePath.substring(0, modulePath.lastIndexOf('/')).split('/').length -
        1,
    )
      .fill('../')
      .join('')

    return writeFile(
      path.join(__dirname, '../src/', modulePath.replace(/\.scss/, '.ts')),
      `import '../${prefix}assets${modulePath}'\n`,
    )
  })
  return Promise.all(asyncTask)
}

preBuild()
