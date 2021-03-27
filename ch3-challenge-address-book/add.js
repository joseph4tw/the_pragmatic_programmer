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

    data.push({
      id,
      name: args['--name'],
      address: args['--address'],
      lastModified: new Date()
    });

    addressFileManager.write(data);
  } catch (error) {
    log(chalk.red(`Error: ${error.message}`));
  }
}

module.exports = add;
