export default function startCompile(rest: Array<() => Promise<void>>) {
  const stack = rest
  return new Promise((resolve) => {
    stack.push(() => {
      resolve(undefined)
      return Promise.resolve()
    })
    stack.reduce((caller, next) => caller.then(next), Promise.resolve())
  })
}
