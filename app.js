const express = require('express');

/** creates an Express application */
const app = express();

/** register view engine 
 * @note EJS templates are processed through the EJS view engine on the server - `server-side rendering`
*/
app.set('view engine', 'ejs');

/** Binds and listens for connections on the specified host and port */
app.listen(3000);

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


