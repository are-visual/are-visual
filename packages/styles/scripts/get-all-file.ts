import fs from 'fs'
import path from 'path'

export const getAllFile = (
  pathName: string,
  check: (fileName: string) => boolean,
) => {
  const result: string[] = []
  const task: string[] = [pathName]

  while (task.length > 0) {
    const pathValue = task.pop()!
    fs.readdirSync(pathValue, { withFileTypes: true }).forEach((name) => {
      if (name.isFile()) {
        const fileName = name.name
        if (!check(fileName)) return
        // const extName = fileName.substring(fileName.lastIndexOf('.') + 1)
        // if (extName !== 'scss') return
        result.push(path.join(pathValue, fileName))
      } else if (name.isDirectory()) {
        task.push(path.join(pathValue, name.name))
      }
    })
  }
  return result
}
