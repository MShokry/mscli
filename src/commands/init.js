const { Command, flags } = require('@oclif/command')
const fs = require('fs')
const path = require('path');
const { exec } = require("child_process");

const callback = (error, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return
  }
};

const folders = () => {
  exec("mkdir -p ./src/{Components,Navigation,Screens,locales,utils,Context,data,assets/{Font,images}}", callback);
}

const config = () => {
  fs.writeFile('react-native.config.js', 
  `module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/assets'],
};
`, callback);
}


class initCommand extends Command {
  static args = [
    { name: 'cmd', default: 'null', },
    { name: 'subCmd', default: 'null' },
  ]
  async run() {
    const { flags, args } = this.parse(initCommand)
    switch (args.cmd) {
      case 'folders':
          folders();
        break;
      case 'config':
          config();
        break;
      default:
        console.log('Please select command form\n\
          folders,config')
    }

  }
}

initCommand.description = `Init the project

`

initCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
}

module.exports = initCommand