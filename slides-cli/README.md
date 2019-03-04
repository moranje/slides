slides
======

&#34;CLI tool for doing slideshow stuff&#34;

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/slides.svg)](https://npmjs.org/package/slides)
[![Downloads/week](https://img.shields.io/npm/dw/slides.svg)](https://npmjs.org/package/slides)
[![License](https://img.shields.io/npm/l/slides.svg)](https://github.com/moranje/slides/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g slides
$ slides COMMAND
running command...
$ slides (-v|--version|version)
slides/0.0.0 darwin-x64 node-v11.9.0
$ slides --help [COMMAND]
USAGE
  $ slides COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`slides hello [FILE]`](#slides-hello-file)
* [`slides help [COMMAND]`](#slides-help-command)

## `slides hello [FILE]`

describe the command here

```
USAGE
  $ slides hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ slides hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/moranje/slides/blob/v0.0.0/src/commands/hello.ts)_

## `slides help [COMMAND]`

display help for slides

```
USAGE
  $ slides help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
