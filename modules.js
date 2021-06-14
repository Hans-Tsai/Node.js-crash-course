/** require() --- In Node.js, import other file into this file
 * @param using relative path to whatever file we want to import
*/
const { peopleName, ages } = require('./people');

/** import from Node.js core module --- os object */
const os = require('os');

/** if we don't use `export` keyword in the file used to be exported, then here we'll get the empty object */
// console.log(peopleName);   // {}
// console.log(ages);   // {}

/** get the exported variable value from people.js */
console.log(peopleName);   // [ 'Hans', 'Eric', 'Amy', 'Jenny' ]
console.log(ages);   // [20, 25, 30, 35]

console.log(os.platform(), os.homedir());   // darwin、/Users/hans
