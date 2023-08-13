// Import npm liblary
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

// Import library
const route = require('./routes');
const db = require('./config/db/');
const sortMiddleware = require('./app/middlewares/sort.middleware');

// Connect to DB
db.connect();

// Declaration variable
const app = express();
const port = 2008;

// Config use
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(sortMiddleware);

// Config view engine
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sortable: (field, sort) => {
                const types = {
                    default: 'fa6-solid:sort',
                    asc: 'bi:sort-up',
                    desc: 'bi:sort-down',
                };

                return `<a 
            href="?sort&column=${field}&type=${
                sort.type === 'asc' ? 'desc' : 'asc'
            }"
            style="text-decoration: none;">
            <iconify-icon 
            icon="${field === sort.column ? types[sort.type] : types.default}">
            </iconify-icon>
            </a>`;
            },
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.clear();
    console.log(`Open WebServer Success at: http://localhost:${port}`);
});
