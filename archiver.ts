import { createWriteStream, createReadStream } from 'fs';
const archiver = require('archiver');

const output = createWriteStream(__dirname + '/Archive.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.info(archive.pointer() + ' total bytes');
  console.info(
    'archiver has been finalized and the output file descriptor has closed.',
  );
});

output.on('end', () => {
  console.info('Data has been drained');
});

archive.pipe(output);

archive.append(createReadStream(__dirname + '/package.json'), {
  name: 'package.json',
});
archive.append(createReadStream(__dirname + '/.env'), {
  name: '.env',
});
archive.append(createReadStream(__dirname + '/nest-cli.json'), {
  name: 'nest-cli.json',
});
archive.append(createReadStream(__dirname + '/yarn.lock'), {
  name: 'yarn.lock',
});
archive.directory('dist', 'dist');

archive.finalize();
