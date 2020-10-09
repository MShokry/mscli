const {Command, flags} = require('@oclif/command')

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.js`)
  }
}

HelloCommand.description = `This Cli  is created to help me in the process of creating
React-native project
it's used to create folder stucture
and get some templates, and use it
`

module.exports = HelloCommand
