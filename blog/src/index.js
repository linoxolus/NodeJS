const express = require('express');
const app = express();
const port = 2008; 

app.get('/', (req, res) => {
    res.send('test');
})

app.listen(port, () => {
    console.log(`Open WebServer Success at: http://localhost:${port}`)
})