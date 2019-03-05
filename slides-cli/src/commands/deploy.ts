import {Command} from '@oclif/command';
import {readdirSync, readFileSync, statSync} from 'fs';
import {join} from 'path';
import {cd, echo, exec, touch} from 'shelljs';
import * as url from 'url';

export default class Deploy extends Command {
  static description = 'build all slideshows';

  async run() {
    let repoUrl;
    let pkg = JSON.parse(readFileSync('package.json') as any);
    if (typeof pkg.repository === 'object') {
      if (!pkg.repository.hasOwnProperty('url')) {
        throw new Error('URL does not exist in repository section');
      }
      repoUrl = pkg.repository.url;
    } else {
      repoUrl = pkg.repository;
    }

    let parsedUrl = url.parse(repoUrl);
    let repository = (parsedUrl.host || '') + (parsedUrl.path || '');
    let ghToken = process.env.GH_TOKEN;

    echo('Deploying presentations!!!');
    cd('dist');
    touch('.nojekyll');
    exec('git init');
    exec('git add .');
    exec('git config user.name "Martien Oranje"');
    exec('git config user.email "martieno@gmail.com"');
    exec('git commit -m "chore(presentations): update gh-pages"');
    exec(
      `git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`
    );
    echo('Presentations deployed!!');
  }
}
