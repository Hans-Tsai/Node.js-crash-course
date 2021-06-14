const express = require('express');

/** creates an Express application */
const app = express();
/** Binds and listens for connections on the specified host and port */
app.listen(3000);
/** Routes HTTP GET requests to the specified path with the specified callback functions */
app.get('/', (req, res) => {
    // express will automatically infers and sets the Content-Type response header field (e.g. text/html)
    // res.send('<p>Home Page</p>');

    // Transfers the file at the given path
    res.sendFile('./views/index.html', { root: __dirname });
});
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});

/** redirects */
app.get('/about-us', (req, res) => {
    res.redirect(301, '/about');
});

/** 404 page */
/** @function app.use()
 * @summary use this specified callback function for every incoming request
 * @description create a middleware function and fire the middleware function when the `path` argument value is matched
 * @note because it's served as a default 404 not found page, so it should at the very bottom of the code
 */
app.use((req, res) => {
    res.status(404).res.sendFile('./views/404.html', { root: __dirname });
});


