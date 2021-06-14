<<<<<<< HEAD
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('request made.');

    // `req.url` - it won't contain `localhost:3000`, and it will just show the rest part of the URL
    console.log(`req.url: ${req.url}`);   // req.url: /
    // `req.method` - it will show what kind of HTTP method that we're using
    console.log(`req.method: ${req.method}`);   // req.method: GET

    /** @function res.setHeader()
     * @note it gives the client (e.g. the browser) a little more information about what kind of `response` object is coming back to it.
     * @description set `response` object header content type
     */
    // res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    /** set basic routings depending on the specific URL path */
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            /** status code - describe the type of response that sent to the browser
             * @returns 200 OK (success)
             * @returns 301 Move Permanently (error)
             * @returns 404 Not Found (error)
             * @returns 500 Internal Server Error (error)
             */
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // redirect /about-me page to the /about page
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    };

    
    /** @function res.write()
     * @note In real world, it's not a good way to write HTML into the response object, instead using `fs` core module.
     * @description sends a chunk of the response body
     */
    // res.write('Hello, Hans!')
    // res.write('<p>Hello, Hans on HTML!</p>');
    // res.write('<p>Hello again, Hans on HTML!</p>');

    /** In real world cases, we usually write HTML to the response object via `fs.readFile()` method */
    fs.readFile(path, (err, data) => {
        if (err) { 
            console.log(err);
            res.end();
        }
        else {
            // res.write(data);
            // res.end();
            /** Only if we're just sending one thing into the `res.write()` method can use */
            res.end(data);
        }
    });

    /** @function res.end()
     * @description This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete.
     */
    // res.end();
});

const portNumber = 3000;
=======
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
>>>>>>> main
server.listen(portNumber, 'localhost', () => {
    console.log(`listening for requests on port ${portNumber}`);
});