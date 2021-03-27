const chalk = require('chalk');
const addressFileManager = require('./addressFileManager');
const log = console.log;

function update(args) {
  if (!args['--address']) {
    log(chalk.red(`Error: there must be an address specified.`));
    return;
  }

  if (isNaN(args['--id'])) {
    log(chalk.red(`Error: there must be an ID specified.`));
    return;
  }

  try {
    const data = addressFileManager.read();

    if (data.length === 0) {
      log(`Found 0 records to update.`);
      return;
    }

    const id = args['--id'];
    const updateRecord = data.find((_) => _.id === id);

    if (!updateRecord) {
      log(`Found 0 records to update.`);
      return;
    }

    updateRecord.address = args['--address'];

    addressFileManager.write(data);

    log(chalk.green(`Updated record:`));
    log(chalk.green(JSON.stringify(updateRecord, null, 2)));
  } catch (error) {
    log(chalk.red(`Error: ${error.message}`));
  }
}

module.exports = update;
