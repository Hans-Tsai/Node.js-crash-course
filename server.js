/** In Node.js, we don't need to create a server manually first, like PHP.
 * @description we can create a server via and listen for requests coming from browsers via code.
 */
const http = require('http');

/** create a Node.js server and save it into the variable `server` 
 * @param callback {Function} - run every time when a request comes into our server
 * @returns server {http.Server} 
*/
const server = http.createServer((req, res) => {
    // when we type `localhost:3000` on the browser URL, then it will send a get request to the server 
    // and print `request made` on the backend terminal console not on the browser console
    console.log('request made');
});

/** port number - represents a specific gateway or port on our computer
 * @note port number are like doors into a computer
 */
const portNumber = 3000;

/** `localhost` - is like a domain name on the web, e.g. google.com
 * @note `localhost` will take us to a specific look back IP address - `127.0.0.1` and 
 * it points directly back to our own computer.
 * @note We'd use `3000` port number for local web development commonly.
 * @description Starts the HTTP server listening for connections.
 */
server.listen(portNumber, 'localhost', () => {
    console.log(`listening for requests on port ${portNumber}`);
});