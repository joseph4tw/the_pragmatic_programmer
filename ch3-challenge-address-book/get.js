const chalk = require('chalk');
const addressFileManager = require('./addressFileManager');
const log = console.log;

function get(args) {
  try {
    let filter;

    if (args['--name']) {
      filter = args['--name'];
    }

    const data = addressFileManager.read();

    if (data.length === 0) {
      log('Found 0 records.');
      return;
    }

    if (!filter) {
      log(chalk.green(`Found ${data.length} records:`));
      log();
      log(chalk.green(JSON.stringify(data, null, 2)));
      return;
    }

    let result = data.filter((_) => _.name.toLowerCase() === filter.toLowerCase());

    log(chalk.green(`Found ${result.length} records:`));
    log();
    log(chalk.green(JSON.stringify(result, null, 2)));
    return;
  } catch (error) {
    log(chalk.red(`Error: ${error.message}`));
    return;
  }
}

module.exports = get;
