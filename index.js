const fs = require('fs');
const {encode} = require("./encode");
const {getArguments} = require("./helpers");
const {TransformEncode} = require("./stream/transform");
const {ReadStream} = require("./stream/read");

// console.log(fs.statSync.f);
// process.exit();
const arg = getArguments(process.argv.slice(2));

// const readStream = new ReadStream('', {});
const writeStream = fs.createWriteStream(__dirname+ '/data/output.txt', {flags: 'a'});

const transform = new TransformEncode(arg, {});
process.stdin.pipe(transform).pipe(process.stdout).on('error', (err) => {
  process.stderr.write('Error with reading or writing data:\n' + err);
  process.exit(123)
})



//console.log(process.argv);
// fs.statSync. // проверка наличия файла

