const path = require('path');
const express = require('express');

const app = express();
const port = 2008;

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, () => {
    console.clear();
    console.log(`App opened at http://localhost:${port}`);
});