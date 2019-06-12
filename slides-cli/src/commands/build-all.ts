import {Command} from '@oclif/command'
import {readdirSync, statSync} from 'fs'
import * as Handlebars from 'handlebars'
import {join} from 'path'
import * as shell from 'shelljs'

export default class BuildAll extends Command {
  static description = 'build all slideshows'

  async run() {
    const getProjects = (path: any) =>
      readdirSync(path).filter((f: any) =>
        statSync(join(path, f)).isDirectory()
      )
    const list = getProjects('presentations')
    let source = shell.cat('slides-cli/src/assets/preview.hbs').stdout
    let template = Handlebars.compile(source)
    let projects = list
      .sort()
      .map(project => ({name: project.toLocaleUpperCase(), url: project}))

    shell.mkdir('-p', 'dist/slides')
    shell.cp(
      'slides-cli/src/assets/slides.css',
      'dist/slides/slides.css'
    )
    shell.exec('npx reveal-md presentations/ --css=dist/slides/slides.css --static dist')

    shell.rm('dist/index.html')
    shell.exec(`echo '${template({projects})}' > dist/index.html`, {
      silent: true
    })

    this.log('Projects compiled')
  }
}
