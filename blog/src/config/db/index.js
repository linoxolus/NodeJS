const mongoose = require('mongoose');

function connect() {
    mongoose
        .connect('mongodb://127.0.0.1/wood_dev')
        .then(() => console.log('Connect success!'))
        .catch(() => console.log('bug!!!'));
}

module.exports = { connect };
