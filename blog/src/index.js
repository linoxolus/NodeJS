// Import liblary
const exp = require('constants');
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

// Declaration variable
const app = express();
const port = 2008; 

// Config static file
app.use(express.static(path.join(__dirname, 'public')))

// Config view engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname ,'resources', 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/news', (req, res) => {
    res.render('news');
})

app.listen(port, () => {
    console.clear();
    console.log(`Open WebServer Success at: http://localhost:${port}`);
});