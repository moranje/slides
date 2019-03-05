import {Command} from '@oclif/command'
import * as shell from 'shelljs'

export default class BuildAll extends Command {
  static description = 'build all slideshows'

  async run() {
    shell.exec('npx reveal-md presentations/ --static dist')

    this.log('Projects compiled')
  }
}
