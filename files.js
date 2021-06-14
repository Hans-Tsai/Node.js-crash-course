/** Javascript can only interact with the filesystem in Node.js, instead of the browser 
 * @description import from Node.js core module --- filesystem (a.k.a fs)
*/
const fs = require('fs');

/** reading files
 * @async
 * @note `buffer` is basically just a package of data
 * @param path {string} - using relative path
 * @param callback {Function} - this callback function will be fired when the `fs.readFile()` function is complete.
 * @param data {string | string} - return the data
*/
// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if (err) console.log(err);
//     // console.log(data);   // <Buffer 48 65 6c 6c 6f 2c 20 48 61 6e 73 21>
//     console.log(data.toString());   // Hello, Hans!
// });

/** Javascript Engine will print this line first before fs.readFile() asynchronous function is fired and the callback function is finished*/
// console.log('Reading files are finished.');   // Reading files are finished.

/** writing files 
 * @async
 * @param path {string} - using relative path
 * @param callback {Function} - this callback function will be fired when the `fs.writeFile()` function is complete.
 * @param data {string | Buffer | TypedArray | DataView | Object}
 * @returns this method is going to replace whatever is in this file with the `data`
*/
// fs.writeFile('./docs/blog1.txt', 'Hello, world!', () => {
//     console.log('The file was written.');
// });

/** When the specified file isn't exist, then Node.js wont' throw an error, instead creating a new file with such name*/
// fs.writeFile('./docs/blog2.txt', 'Hello, again!', () => {
//     console.log('The file was written again.');
// });

/** directories 
 * @async
 * @description make a new directory. If the specified directory already existed, then throw an error object.
 * @path {string | Buffer | URL} - specify where to create the new directory
*/
// check if the specified directory was already existed or not synchronously
// if (!fs.existsSync('./assets')) {
//     fs.mkdir('./assets', (err) => {
//         if (err) console.log(err);
//         console.log('folder created');
//     })
// }
// else {
//     // this is the asynchronous version of deleting the specified directory
//     fs.rmdir('./assets', (err) => {
//         if (err) console.log(err);
//         console.log('folder deleted');
//     })
// }

/** deleting files 
 * @async
 * @description remove a specified file or symbolic link
*/
if (fs.existsSync('./docs/deleteMe.txt')) {
    fs.unlink('./docs/deleteMe.txt', (err) => {
        if (err) console.log(err);
        console.log('file was deleted');
    })
}
