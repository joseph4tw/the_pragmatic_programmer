const chalk = require('chalk');
const log = console.log;

const example = {
  id: 0,
  name: 'John Doe',
  address: '123 Fake Street, Fake Town, USA, 12345',
  lastModified: new Date(),
};

const updateExample = {
  id: 0,
  name: 'John Doe',
  address: '456 Fake Drive, Fake City, USA, 54321',
  lastModified: new Date(),
};

function help(args) {
  log('Help -----------------');
  log();
  log('Commands:');
  log('--add\t\tAdds a new address');
  log('--get\t\tFinds an existing address');
  log('--update\tUpdates an existing address');
  log('--delete\tRemoves an existing address');
  log();
  log('To learn more about a specific command,');
  log('include that command. For example:');
  log();
  log('node index.js --help --add');
  log();

  if (args['--add']) {
    add();
  }

  if (args['--get']) {
    get();
  }

  if (args['--update']) {
    update();
  }

  if (args['--delete']) {
    del();
  }
}

function add() {
  log('--add Command');
  log();
  log('Be sure to include the name and address with this command.');
  log();
  log('Example:');
  log();
  log(chalk.green(`node index.js --add --name '${example.name}' --address '${example.address}'`));
  log(chalk.green(`Added new address. ID: ${example.id}`));
  log();
}

function get() {
  log('--get Command');
  log();
  log('Gets a record using either the name of the address or the ID.');
  log('Names are not case sensitive. Partial names or repeated names will find multiple results.');
  log('If you use --get without --name, it will return all records.');
  log();
  log('Example:');
  log();
  log(chalk.green(`node index.js --get --name '${example.name}'`));
  log(chalk.green(`Found 1 address with the name '${example.name}':`));
  log(chalk.green(JSON.stringify(example, null, 2)));
  log();
}

function update() {
  log('--update Command');
  log();
  log('Updates a record using the address ID. You can only change the address, not the name.');
  log();
  log('Example:');
  log();
  log(chalk.green(`node index.js --update --id ${example.id} --address ${updateExample.address}`));
  log(chalk.green(`Modified 1 address:`));
  log(chalk.green(JSON.stringify(updateExample, null, 2)));
  log();
}

function del() {
  log('--delete Command');
  log();
  log('Removes a record using the address ID.');
  log();
  log('Example:');
  log();
  log(chalk.green(`node index.js --delete --id ${example.id}`));
  log(chalk.green(`Deleted 1 address:`));
  log(chalk.green(JSON.stringify(example, null, 2)));
  log();
}

module.exports = help;
