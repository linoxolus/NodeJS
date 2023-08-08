const news = require('../models/news.model');
const { mongooseToObject } = require('../../utils/mongoose.utils');
class NewsController {
    // [GET] /news/:slug
    show(req, res, next) {
        news.findOne({ slug: req.params.slug })
            .then((news) => {
                res.render('news/show', { news: mongooseToObject(news) });
            })
            .catch(next);
    }

    upload(req, res, next) {
        res.render('news/upload');
    }
}

module.exports = new NewsController();
