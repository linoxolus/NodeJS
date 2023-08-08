const News = require('../models/news.model');
const { mongoosesToObject } = require('../../utils/mongoose.utils');

class SiteController {
    // [GET] /
    index(req, res, next) {
        News.find({})
            .then((newses) => {
                res.render('home', {
                    newses: mongoosesToObject(newses),
                });
            })
            .catch(next);

        // res.render('home');
    }
}

module.exports = new SiteController();
