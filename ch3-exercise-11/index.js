const fs = require('fs');
const yaml = require('yaml');

const contents = fs.readFileSync('./convert-from/sample.yml');
const ymlParsed = yaml.parse(Buffer.from(contents).toString());
const jsonString = JSON.stringify(ymlParsed, null, 2);
const filePath = `./convert-to/${(Date.now())}.converted.json`;
fs.writeFileSync(filePath, jsonString);
