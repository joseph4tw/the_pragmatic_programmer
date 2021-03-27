const fs = require('fs');

const filepath = `${__dirname}/addresses.json`;

function read() {
  if (fs.existsSync(filepath)) {
    let data = fs.readFileSync(filepath);
    data = JSON.parse(data);
    return data;
  }

  return [];
}

function write(data) {
  if (typeof data !== 'object') {
    throw new Error('data type is invalid - must be an array')
  }
  fs.writeFileSync(filepath, JSON.stringify(data));
}

module.exports = {
  read,
  write,
};
