const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // console.log('request made.');

    /** lodash */
    const randomNumber = _.random(0, 20);
    console.log(randomNumber);   // a random number between 0 and 20. E.g. 15

    const greet = _.once(() => console.log('hello'));
    greet();   // hello
    greet();   // it won't return anything

    // `req.url` - it won't contain `localhost:3000`, and it will just show the rest part of the URL
    // console.log(`req.url: ${req.url}`);   // req.url: /
    // `req.method` - it will show what kind of HTTP method that we're using
    // console.log(`req.method: ${req.method}`);   // req.method: GET

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
server.listen(portNumber, 'localhost', () => {
    console.log(`listening for requests on port ${portNumber}`);
});