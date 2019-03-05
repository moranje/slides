import {Command} from '@oclif/command'
import * as shell from 'shelljs'

export default class Build extends Command {
  static description = 'build a slideshow from markdown'

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Build)

    shell.exec(
      `npx nodemon -w presentations/${args.project} -e md -x \"npx reveal-md ${
        args.project
      }/index.md --static presentations/${args.project}/dist\" --ignore dist/`
    )

    this.warn('Something went wrong')
  }
}
