import fs from 'fs'
import path from 'path'

const appDirectory = fs.realpathSync(process.cwd())
const resolveRoot = (...relativePath: string[]) =>
  path.resolve(appDirectory, ...relativePath)

export default resolveRoot
