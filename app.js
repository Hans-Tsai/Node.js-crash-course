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
    .then(result => app.listen(3000) && console.log('connected to MongoDB'))
    .catch(err => console.log(err));

/** register view engine 
 * @note EJS templates are processed through the EJS view engine on the server - `server-side rendering`
*/
app.set('view engine', 'ejs');

/** use express framework built-in middleware function to serve static files */
app.use(express.static('public'));
/** use express framework built-in middleware function to parse incoming requests with urlencoded payloads and it's based on body-parser 
 * @description takes all the URL encoded data and passes that into an object that we can use on the request object (i.e. `req.body`)
 */
app.use(express.urlencoded());
/** use morgan library to create a HTTP request logger middleware function */
app.use(morgan('dev'));

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
        .then(result => res.render('index', { title: 'All Blogs', blogs: result }))
        .catch(err => console.log(err));
});

/** set up new blog POST method handler function */
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(err => console.log(err));
});

/** get the specified blog by its _id 
 * @description it should use semi-colon (`:`) to indicate it's a route parameter
*/
app.get('/blogs/:id', (req, res) => {
    // using `req.params.id` because of we're using `:id` on the above
    const blogID = req.params.id;
    Blog.findById(blogID)
        .then(result => res.render('details', { blog: result, title: 'Blog Details' }))
        .catch(err => console.log(err));
});


/** create new blog post */
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

/** delete the specified `_id` blog */
app.delete('/blogs/:id', (req, res) => {
    const blogID = req.params.id;

    // always use `Model.findOneAndDelete()` instead of `Model.findOneAndRemove()` unless you have a good reason not to.
    Blog.findByIdAndDelete(blogID)
        .then(result => res.json({ redirect: '/blogs' }))
        .catch(err => console.log(err));
});

/** 404 page */
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});