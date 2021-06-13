const peopleName = ['Hans', 'Eric', 'Amy', 'Jenny'];
const ages = [20, 25, 30, 35];

/** module.exports --- export something manually from this module 
 * @description In this case, we're going to export the `peopleName` variable on line 1, 
 * and the `ages` variable on line 2.
 * @note we can use an object to include all of the variables we want to export from this file.
*/
module.exports = {
    peopleName,
    ages,
};