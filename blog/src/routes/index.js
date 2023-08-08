const newsRouter = require('./news.route');
const siteRouter = require('./site.route');
const searchRouter = require('./search.route');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/search', searchRouter);
    app.use('/', siteRouter);
}

module.exports = route;
