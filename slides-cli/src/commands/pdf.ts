import {Command, flags} from '@oclif/command'
import * as shell from 'shelljs'

export default class PDF extends Command {
  static description = 'create pdf from slideshow'

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(PDF)

    shell.exec(
      `npx reveal-md ../${args.project}/index.md --print ../${args.project}/${
        args.project
      }.pdf`
    )

    this.log('PDF created')
  }
}
