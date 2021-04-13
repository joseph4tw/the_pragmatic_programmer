const fs = require('fs');
const path = require('path');

async function getAllJsFiles(initialPath) {
  const dir = await fs.promises.opendir(initialPath);
  // console.log(dir);
  const files = [];
  for await (const dirent of dir) {
    // console.log(dirent);
    if (path.extname(dirent.name) === '.js') {
      files.push(path.join(initialPath, dirent.name));
    }

    if (dirent.isDirectory()) {
      let moreFiles = await getAllJsFiles(path.join(initialPath, dirent.name));
      files.push(...moreFiles);
    }
  }

  return files;
}

function findCamelCase(path, content) {
  const lines = content.split(/\r?\n/);
  const regex = /\b([a-z]+[A-Z]+[a-z]*)\b/g;
  lines.forEach((line, index) => {
    let result;
    while ((result = regex.exec(line)) !== null) {
      console.log(
        `${path}
line ${index + 1} column ${result.index}:
${result.input}
${' '.repeat(result.index)}${'-'.repeat(result[0].length)}
`);
    }
  });
}

async function main() {
  let files = await getAllJsFiles(__dirname);
  console.log(files);
  files.forEach(async (file) => {
    const content = await fs.promises.readFile(file);
    findCamelCase(file, content.toString());
  });
}

main();

// async function print(initialPath) {
//   const dir = await fs.promises.opendir(initialPath);
//   console.log(initialPath);
//   for await (const dirent of dir) {
//     console.log(dirent.name);
//     if (dirent.isDirectory()) {
//       console.log(`${path.join(initialPath, dirent.name)} is a directory`);
//     }
//   }
// }
// print(__dirname).catch(console.error);