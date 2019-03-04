import {Command} from '@oclif/command'
import * as shell from 'shelljs'

export default class Build extends Command {
  static description = 'build a slideshow from markdown'

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Build)
    let parentDir = shell.exec(`echo $(dirname "${process.cwd()}")`, {
      silent: true
    }).stdout

    shell.cd(`${parentDir}`)
    shell.exec(
      `npx nodemon -w ${args.project} -e md -x \"npx reveal-md ${
        args.project
      }/index.md --static ${args.project}/dist\" --ignore dist/`
    )

    this.warn('Something went wrong')
  }
}
