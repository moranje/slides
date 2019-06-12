import {Command} from '@oclif/command'
import * as nodemon from 'nodemon'
import opn from 'opn'
import * as shell from 'shelljs'

import BuildAll from './build-all'

export default class Build extends Command {
  static description = 'build a slideshow from markdown'

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Build)

    nodemon({
      watch: [
        `presentations/${args.project}`
      ],
      ext: 'md'
    })

    nodemon.on('start', async () => {
      await BuildAll.run()
      shell.exec('npx serve dist')
      opn(`http://localhost:5000/${args.project}`)
    }).on('restart', async (files: any) => {
      console.log('App has restarted', files)
      await BuildAll.run()
    }).on('quit', () => {
      console.log('App has quit')
      process.exit()
    })

    nodemon.emit('start')
  }
}
