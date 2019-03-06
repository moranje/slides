import {Command} from '@oclif/command'
import * as shell from 'shelljs'

export default class Create extends Command {
  static description = 'create a new slideshow'

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Create)
    const date = new Date()

    let fileContent = [
      '---',
      `title: ${args.project.charAt(0).toUpperCase()}${args.project
        .slice(1)
        .toLowerCase()}`,
      'author: Martien Oranje',
      `date: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      "verticalSeparator: '==='",
      "theme: 'moon'",
      'revealOptions:',
      '  controls: true',
      "  transition: 'slide'",
      '  slideNumber: true',
      '  history: true',
      '  overview: true',
      '  showNotes: false',
      '  center: true',
      '---',
      '',
      `# ${args.project.charAt(0).toUpperCase()}${args.project
        .slice(1)
        .toLowerCase()}`,
      '',
      'MARTIEN ORANJE'
    ].join('\n')

    shell.mkdir('-p', `presentations/${args.project}`)
    shell.exec(
      `echo "${fileContent}" > presentations/${args.project}/index.md`,
      {
        silent: true
      }
    )

    this.log(`Created new project ${args.project}`)
  }
}
