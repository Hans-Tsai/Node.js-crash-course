// Global object

// console.log(global);

/** setTimeout():
 * @description run it once after 3 seconds 
*/
global.setTimeout(() => {
    console.log('in the timeout');
    // terminate the interval timer function
    clearInterval(intervalFunc);
}, 3000);

/** setInterval():
 * @description run every 1 second
*/
const intervalFunc = global.setInterval(() => {
    console.log('in the interval');
}, 1000);

/** gets the absolute path of the current `folder` */
console.log(__dirname);   // /Users/hans/個人自主練習/NodeJS/Node.js-crash-course
/** get the absolute path of the current `folder + filename` */
console.log(__filename);   // /Users/hans/個人自主練習/NodeJS/Node.js-crash-course/global.js

/** wrong demonstration! */
// console.log(document.querySelector);   // ReferenceError: document is not defined