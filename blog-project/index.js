const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const articles = require('./articles');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect('mongodb://localhost/blogproject', { useNewUrlParser: true });
let db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Mongo DB is connected'));

app.get('/', (req, res) => res.render('index', {
    title: 'Most viewed articles',
    articles: articles
}));

app.get('/articles/add', (req, res) => res.render('addArticle', {
    title: 'Add article'
}));

app.post('/articles/add', (req, res) => {
    const { title, author, body } = req.body;
    const articleObject = {
        id: articles.length + 1,
        title,
        author,
        body
    }
    articles.unshift(articleObject);
    res.redirect('/');
});

//ejs pug mustasche template engine

app.listen(3000, () => console.log('server is up and running at port 3000'));