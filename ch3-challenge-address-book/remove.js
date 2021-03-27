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
    const index = data.findIndex((_) => _.id === args['--id']);

    if (index === -1) {
      log('No records found to delete.');
      return;
    }

    const deletedItems = data.splice(index, 1);

    addressFileManager.write(data);

    log(chalk.green(`Deleted ${deletedItems.length} item(s):`));
    log(chalk.green(JSON.stringify(deletedItems, null, 2)));
  } catch (error) {
    log(chalk.red(`Error: ${error.message}`));
  }
}

module.exports = remove;
