const chalk = require('chalk');
const addressFileManager = require('./addressFileManager');
const log = console.log;

function add(args) {
  if (!args['--name'] || !args['--address']) {
    log(chalk.red('Error: You must include both --name and --address'));
    return;
  }

  try {
    const data = addressFileManager.read();
    let id = 0;

    if (data.length > 0) {
      id = data.reduce((max, cur) => max.id > cur.id ? max : cur).id;
      id++;
    }

    const record = {
      id,
      name: args['--name'],
      address: args['--address'],
      lastModified: new Date()
    };

    data.push(record);

    addressFileManager.write(data);

    log(chalk.green(`Added 1 record:`));
    log(chalk.green(JSON.stringify(record, null, 2)));
  } catch (error) {
    log(chalk.red(`Error: ${error.message}`));
  }
}

module.exports = add;
