import chalk from 'chalk'

class Logger {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  private log(message: string, breaks = 1) {
    process.stdout.write(
      `${chalk.cyan(`[${this.name}]`)} ${message}${'\n'.repeat(breaks)}`,
    )
  }

  info(message: string, breaks = 1) {
    this.log(`${chalk.cyan('→')} ${message}`, breaks)
  }

  success(message: string, breaks = 1) {
    this.log(`${chalk.green('✓')} ${message}`, breaks)
  }

  error(message: string, breaks = 1) {
    this.log(`${chalk.red('✗')} ${message}`, breaks)
  }
}

export default Logger
