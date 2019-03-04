import {Command} from '@oclif/command'
import * as shell from 'shelljs'

export default class Create extends Command {
  static description = 'create a new slideshow'

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Create)
    const date = new Date()

    let fileContent = `---
title: '${args.project.charAt(0).toUpperCase()}${args.project
      .slice(1)
      .toLowerCase()}'
author: Martien Oranje
date: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
verticalSeparator: '---v'
theme: 'moon'
revealOptions:
  controls: true
  transition: 'slide'
  slideNumber: true
  history: true
  overview: true
  showNotes: false
  center: true
---

# ${args.project.charAt(0).toUpperCase()}${args.project.slice(1).toLowerCase()}

MARTIEN ORANJE`

    shell.mkdir('-p', `../${args.project}/dist`)
    shell.echo(fileContent).toEnd(`../${args.project}/index.md`)

    this.log(`Created new project ${args.project}`)
  }
}
