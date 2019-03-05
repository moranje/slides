import {Command} from '@oclif/command'
import {readdirSync, statSync} from 'fs'
import {join} from 'path'
import * as shell from 'shelljs'

export default class BuildAll extends Command {
  static description = 'build all slideshows'

  async run() {
    const getProjects = path =>
      readdirSync(path).filter(f => statSync(join(path, f)).isDirectory())
    const projects = getProjects('presentations')
    const html = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '  <head>',
      '    <meta charset="utf-8" />',
      '    <title>Presentations</title>',
      '    <link rel="stylesheet" href="slides/css/theme/moon.css" id="theme" />',
      '    <style type="text/css">',
      '      body {',
      '        margin: 1em;',
      '      }',
      '    </style>',
      '  </head>',
      '',
      '  <body>',
      ...projects.map(project => `    <iframe src="${project}/index.html">`),
      '  </body>',
      '</html>'
    ].join('\n')

    shell.exec('npx reveal-md presentations/ --static dist')
    shell.exec(`echo "${html}" > presentations/index.html`, {
      silent: true
    })

    this.log('Projects compiled')
  }
}
