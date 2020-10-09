const { Command, flags } = require('@oclif/command')
const fs = require('fs')
const path = require('path');
const { exec } = require("child_process");
const inquirer = require('inquirer');
const yargs = require('yargs');
// const shell = require('shelljs');

const templatePath = `${__dirname}/../templates`;
const CURR_DIR = process.cwd();

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

const CHOICES = fs.readdirSync(path.join(templatePath, '/projects'));

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
    when: () => !yargs.argv['template']
  }
];
const INIT = [
  {
    name: 'name',
    type: 'input',
    message: 'Project name:',
    when: () => !yargs.argv['name'],
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const folders = () => {
  exec("mkdir -p ./src/{Components,Navigation,Styles,Screens,locales,utils,Context,data,assets/{Font,images}}", callback);
}

const config = () => {
  // console.log(CURR_DIR, templatePath);
  const contents = fs.readFileSync(`${templatePath}/react-native.config.js`, 'utf8');
  const writePath = `${CURR_DIR}/react-native.config.js`;
  fs.writeFileSync(writePath, contents, 'utf8');
}


const SKIP_FILES = ['node_modules', '.template.json','.DS_Store'];
function createDirectoryContents(templatePath, projectName) {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);
    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    if (SKIP_FILES.indexOf(file) > -1) return;
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');
      // contents = template.render(contents, { projectName });
      const writePath = path.join( projectName, file);
      if (fs.existsSync(writePath)){
        console.log('file Exists ', file);
      }else{
        fs.writeFileSync(writePath, contents, 'utf8');
      }
    } else if (stats.isDirectory()) {
      const FOLDER = path.join(projectName, file);
      if (!fs.existsSync(FOLDER)) {
      fs.mkdirSync();
      }
      // recursive call
      // console.log('folder', path.join( projectName, file));
      createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
    }
  });
}

class initCommand extends Command {
  static args = [
    { name: 'cmd', default: 'null', },
    { name: 'subCmd', default: 'null' },
  ]
  async run() {
    const { flags, args } = this.parse(initCommand)
    switch (args.cmd) {
      case 'init':
        inquirer.prompt(INIT)
          .then(answers => {
            console.log(answers)
            exec(`react-native init ${answers.name}`);
            // shell.cd(`${CURR_DIR}/${answers.name}`);
          });
        console.log("")
        break;
      case 'all':
        console.log("Installing Maintools tools");
        exec("yarn add apisauce react-native-safe-area-context react-native-paper @react-native-community/async-storage");
        console.log("Installing Navigation tools");
        exec("yarn add @react-navigation/native @react-navigation/stack");
        exec("yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view");
        console.log("Installing Language tools");
        exec("yarn add i18n-js lodash.memoize react-native-localize");
        inquirer.prompt(QUESTIONS)
          .then(answers => {
            const SRC = path.join(templatePath, '/projects', answers.template,'/')
            console.log(SRC)
            // exec(`cp -r ${SRC}/* ./`)
            createDirectoryContents(SRC, CURR_DIR)
          });
          break;
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