const express = require('express');
const morgan = require('morgan');

/** creates an Express application */
const app = express();

/** register view engine 
 * @note EJS templates are processed through the EJS view engine on the server - `server-side rendering`
*/
app.set('view engine', 'ejs');

/** Binds and listens for connections on the specified host and port */
app.listen(3000);

/** @function app.use()
 * @param req {Object}
 * @param res {Object}
 * @param next {Function}
 * @description create a middleware function 
*/
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log(`host: ${req.hostname}`);
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);
//     next();
// });
// app.use((req, res, next) => {
//     console.log('in the next middleware function');
//     next();
// });

/** use morgan library to create a HTTP request logger middleware function */
app.use(morgan('dev'));
/** use express framework built-in middleware function to serve static files */
app.use(express.static('public'));

/** Routes HTTP GET requests to the specified path with the specified callback functions */
app.get('/', (req, res) => {
    const blogs = [
        { title: '標題一', snippet: '段落一' },
        { title: '標題二', snippet: '段落二' },
        { title: '標題三', snippet: '段落三' },
    ];
    res.render('index', { title: 'Home', blogs });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

/** create new blog post */
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

/** 404 page */
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});