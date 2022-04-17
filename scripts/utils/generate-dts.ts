import execa from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'
import path from 'path'

export default async function generateDts(packagePath: string) {
  await execa('pnpm', ['ttsc', '--project', 'tsconfig.json'], {
    cwd: packagePath,
  })

  const files = await fg(['lib/**/*.js'])
  return Promise.all(
    files.map((file) => fs.remove(path.join(packagePath, file))),
  )
}
