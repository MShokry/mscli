const {Command, flags} = require('@oclif/command')
const { exec } = require("child_process");



class AddCommand extends Command {
  static args = [
    { name: 'cmd', default: 'null', },
    { name: 'subCmd', default: 'null' },
  ]

  async run() {
    const {flags, args} = this.parse(AddCommand)
    exec("yarn add @react-navigation/native @react-navigation/stack");
    exec("yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view")
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/mshokry/PWS/react/ms/src/commands/add.js`)
  }
}

AddCommand.description = `Describe the command here
...
Extra documentation goes here
`

AddCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = AddCommand
