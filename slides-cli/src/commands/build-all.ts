import {Command} from '@oclif/command'
import {readdirSync, statSync} from 'fs'
import {join} from 'path'
import * as shell from 'shelljs'

export default class BuildAll extends Command {
  static description = 'build all slideshows'

  async run() {
    const getProjects = (path: any) =>
      readdirSync(path).filter(f => statSync(join(path, f)).isDirectory())
    const projects = getProjects('presentations')
    const html = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '  <head>',
      '    <meta charset="utf-8" />',
      '    <title>Presentations</title>',
      '    <link rel="stylesheet" href="/slides/css/theme/moon.css" id="theme" />',
      '    <style type="text/css">',
      '      body {',
      '        margin: 1em;',
      '      }',
      '      a {',
      '        text-decoration: none;',
      '      }',
      '      .card {',
      '        width: 300px;',
      '        height: 200px;',
      '        border-radius: 6px;',
      '        box-shadow: 0 6px 16px rgba(0,0,0,0.15);',
      '        cursor: pointer;',
      '        float: left;',
      '        margin: 10px;',
      '      }',
      '      .card h1 {',
      '        width: 100%;',
      '        height: 100%;',
      '        margin: 0;',
      '        border-radius: 6px;',
      '        background: #f7f7f7;',
      '        display: -ms-flexbox;',
      '        display: box;',
      '        display: flex;',
      '        -o-box-pack: center;',
      '        justify-content: center;',
      '        -o-box-align: center;',
      '        align-items: center;',
      '        -webkit-font-smoothing: antialiased;',
      '        color: #47525d;',
      '      }',
      '    </style>',
      '  </head>',
      '',
      '  <body>',
      ...projects.sort().map(project => {
        return [
          `    <a href="${project}">`,
          '      <div class="card" >',
          `        <h1 class="title">${project.toLocaleUpperCase()}</h1>`,
          '      </div>',
          '    </a>'
        ].join('\n')
      }),
      '  </body>',
      '</html>'
    ].join('\n')

    shell.exec('npx reveal-md presentations/ --static dist')
    shell.rm('dist/index.html')
    shell.exec(`echo "${html}" > dist/index.html`, {
      silent: true
    })

    this.log('Projects compiled')
  }
}
