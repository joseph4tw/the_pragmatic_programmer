const chalk = require('chalk');
const addressFileManager = require('./addressFileManager');
const log = console.log;

function remove(args) {
  try {
    if (!args['--id']) {
      log(chalk.red('Error: must provide an ID.'));
      return;
    }

    const data = addressFileManager.read();

  } catch (error) {
    log(chalk.red(`Error: ${error.message}`));
  }
}