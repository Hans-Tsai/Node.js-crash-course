const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

/** creates an Express application */
const app = express();

/** connect to MongoDB */
const dbURI = 'mongodb+srv://hans:9cYE1R4fJTkUDO6q@nodejscrashcourse.yukds.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000) && console.log('connected to MongoDB'))
    .catch((err) => console.log(err));

/** register view engine 
 * @note EJS templates are processed through the EJS view engine on the server - `server-side rendering`
*/
app.set('view engine', 'ejs');

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

/** mongoose & mongo sandbox routes */
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog',
//     });
//     // saves this document by inserting a new document into the database, and it's an asynchronous task
//     blog.save()
//         // when `blog.save()` callback function return `Promise` is resolved
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// });
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// });
// app.get('/single-blog', (req, res) => {
//     Blog.findById('60c84cdecbd1807c65b533f4')
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// });

/** Routes HTTP GET requests to the specified path with the specified callback functions */
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

/** blog routes */
app.get('/blogs', (req, res) => {
    // `Model.find()` will find all of documents inside the `blog` collection and sort them with descending order
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => console.log(err));
});

/** create new blog post */
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

/** 404 page */
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});