import cac from 'cac'
import fs from 'fs'
import { isNil } from 'lodash-es'
import path from 'path'
import prompts from 'prompts'

import { buildPackage } from './utils/build-package'

const resolve = (...pathName: string[]) => {
  return path.resolve(__dirname, '../', ...pathName)
}

const resolvePackages = (name?: string) => {
  if (isNil(name)) return resolve('./packages/')
  return resolve('./packages/', name)
}

const packages = fs.readdirSync(resolvePackages()).filter((pathName) => {
  return fs.statSync(resolvePackages(pathName)).isDirectory()
})

async function makeChoose() {
  const response = await prompts({
    type: 'multiselect',
    name: 'packages',
    message: 'Select the package that needs to be compiled.',
    choices: packages.map((packageName) => ({
      title: packageName,
      value: packageName,
    })),
  })

  response.packages.forEach((packageName: string) => {
    buildPackage(packageName, resolvePackages(packageName))
  })
}

const cli = cac()
cli.option(
  '--package <package>',
  'Select the package that needs to be compiled.',
)

const parsed = cli.parse()
const packageName = parsed.options.package
if (parsed.options.package) {
  buildPackage(packageName, resolvePackages(packageName))
} else {
  makeChoose()
}
