import {Command} from '@oclif/command'
import * as Handlebars from 'handlebars'
import * as shell from 'shelljs'

export default class Create extends Command {
  static description = 'create a new slideshow'

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Create)
    const now = new Date()

    let source = shell.cat('slides-cli/src/assets/index-md.hbs').stdout
    let template = Handlebars.compile(source)

    // Variables
    let title = `${args.project.charAt(0).toUpperCase()}${args.project
      .slice(1)
      .toLowerCase()}`
    let date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`

    shell.mkdir('-p', `presentations/${args.project}`)
    shell.exec(
      `echo "${template({title, date})}" > presentations/${
        args.project
      }/index.md`,
      {
        silent: true
      }
    )

    this.log(`Created new project ${args.project}`)
  }
}
