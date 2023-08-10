const news = require('../models/news.model');
const { mongooseToObject } = require('../../utils/mongoose.utils');
const { mongoosesToObject } = require('../../utils/mongoose.utils');

class NewsController {
    // [GET] /news/:slug
    show(req, res, next) {
        news.findOne({ slug: req.params.slug })
            .then((news) => {
                res.render('news/show', { news: mongooseToObject(news) });
            })
            .catch(next);
    }

    // [GET] /news/upload
    upload(req, res, next) {
        res.render('news/upload');
    }

    // [POST] /news/store
    store(req, res, next) {
        news.create(req.body)
            .then(() => res.redirect(`/news/${req.body.slug}`))
            .catch(next);
    }

    // [GET] /news/list
    list(req, res, next) {
        news.find({})
            .then((news) => {
                res.render('news/list', { news: mongoosesToObject(news) });
            })
            .catch(next);
    }

    // [GET] /news/:id/edit
    edit(req, res, next) {
        news.findOneWithDeleted({ _id: req.params.id })
            .then((news) =>
                res.render('news/edit', { news: mongooseToObject(news) }),
            )
            .catch(next);
    }

    // [PUT] /news/:id
    update(req, res, next) {
        news.updateOne(
            {
                _id: req.params.id,
            },
            req.body,
        )
            .then(() => res.redirect('/news/list/'))
            .catch(next);
    }

    // [DELETE] /news/:id
    delete(req, res, next) {
        news.delete({
            _id: req.params.id,
        })
            .then(() => res.send('success'))
            .catch(next);
    }

    // [DELETE] /news/:id/hardDelete
    hardDelete(req, res, next) {
        news.delete({
            _id: req.params.id,
        })
            .then(() => res.send('success'))
            .catch(next);
    }

    // [Restore] /news/:id/restore
    restore(req, res, next) {
        console.log();
        news.restore({
            _id: req.params.id,
        })
            .then(() => res.send('success'))
            .catch(next);
    }

    // [GET] /news/trash
    trash(req, res, next) {
        news.findDeleted({})
            .then((newses) => {
                res.render('news/trash', {
                    news: mongoosesToObject(newses).filter(
                        (news) => news.deleted,
                    ),
                });
            })
            .catch(next);
    }
}

module.exports = new NewsController();
