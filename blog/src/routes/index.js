const newsRouter = require('./news.route');
const siteRouter = require('./site.route');
const searchRouter = require('./search.route')

function route(app) {
  app.use('/', siteRouter);
  app.use('/new', newsRouter);
  app.use('/search', searchRouter);
}

module.exports = route;