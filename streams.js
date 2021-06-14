const fs = require('fs');

const readStream = fs.createReadStream('./docs/readStreamSample.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./docs/writeStreamSample.txt')
/** readStream event listener for listening to a data event
 * @description every time when we get a chunk of data from `data` then fire this callback function
*/
readStream.on('data', (chunk) => {
    // console.log('--------- New chunk ---------');
    // originally, `chunk` will be a buffer object
    // console.log(chunk);
    // check `chunk` object in string type
    // console.log(chunk.toString());

    writeStream.write('\nNew write stream chunk\n');
    writeStream.write(chunk);
});

/** pipe --- It's used to pass data directly from a readable stream to a writable stream
 * @description Essentially, this is same as the code above.But it's quite easier and readable.
 */
readStream.pipe(writeStream);