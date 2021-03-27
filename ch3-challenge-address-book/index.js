const chalk = require('chalk');
const help = require('./help');
const add = require('./add');
const arg = require('arg');
const get = require('./get');
const update = require('./update');
const remove = require('./remove');
const version = '1.0.0';

const args = arg({
  '--help': Boolean,
  '--debug': Boolean,
  '--version': Boolean,
  '--get': Boolean,
  '--add': Boolean,
  '--delete': Boolean,
  '--update': Boolean,
  '--name': String,
  '--address': String,
  '--id': Number,

  // aliases
  '-h': '--help',
  '-v': '--version'
});

if (args['--debug']) {
  console.log(chalk.blue(JSON.stringify(args, null, 2)));
}

if (args['--version']) {
  console.log(`Version ${version}`);
  console.log();
}

if (args['--help']) {
  help(args);
  return;
}

let actions = 0;

if (args['--add']) actions++;
if (args['--get']) actions++;
if (args['--update']) actions++;
if (args['--delete']) actions++;

if (actions > 1) {
  console.error(chalk.red('Conflict: too many commands.'));
  return;
}

if (args['--add']) {
  add(args);
  return;
}

if (args['--get']) {
  get(args);
  return;
}

if (args['--update']) {
  update(args);
  return;
}

if (args['--delete']) {
  remove(args);
  return;
}
