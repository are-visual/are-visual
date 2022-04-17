import inquirer from 'inquirer'

import { targets } from './read'
import { BuildOptions, buildPackage } from './utils/build-package'
import resolveRoot from './utils/dir-path'

interface Args extends BuildOptions {
  packages: string[]
}

async function runScript() {
  inquirer
    .prompt([
      {
        name: 'packages',
        type: 'checkbox',
        message: '选择需要编译的 packages',
        choices: targets.map((item) => ({ name: item, value: item })),
      },
      {
        name: 'formats',
        type: 'checkbox',
        message: '编译选项',
        default: ['es', 'umd'],
        choices: ['es', 'umd', 'cjs'].map((item) => ({
          name: item,
          value: item,
        })),
      },
      {
        name: 'sourcemap',
        type: 'confirm',
        default: false,
        message: '是否输出 sourcemap？',
      },
      {
        name: 'analyze',
        type: 'confirm',
        default: false,
        message: '开启编译文件分析',
      },
    ])
    .then((res: Args) => {
      res.packages.forEach((item) => {
        buildPackage(resolveRoot('packages', item), res)
      })
    })
    .catch((e) => {
      console.log('Err', e)
    })
}

runScript()
