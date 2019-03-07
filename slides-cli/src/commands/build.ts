import {Command} from '@oclif/command'
import * as shell from 'shelljs'

export default class Build extends Command {
  static description = 'build a slideshow from markdown'

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Build)

    shell.mkdir('-p', 'dist/slides')
    shell.cp(
      'slides-cli/src/assets/slides.css',
      'dist/slides/slides.css'
    )
    shell.exec(
      `npx nodemon -w presentations/${
        args.project
      } -e md -x \"npx reveal-md presentations/${
        args.project
      }/index.md --css=dist/slides/slides.css --static presentations/${
        args.project
      }/dist\" --ignore presentations/${args.project}/dist/`
    )
    shell.rm(`presentations/${args.project}dist/index.html`)

    this.warn('Something went wrong')
  }
}
