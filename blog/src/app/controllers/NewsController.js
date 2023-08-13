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
        news.findOne({})
            .sort({ _id: 'desc' })
            .then((latestNews) => {
                if (latestNews?._id) {
                    req.body._id = latestNews._id + 1;
                } else {
                    req.body._id = 1;
                }

                news.create(req.body)
                    .then(() => res.redirect(`/news/${req.body.slug}`))
                    .catch(next);
            });
    }

    // [GET] /news/list
    list(req, res, next) {
        var newsQuery = news.find({});

        if (req.query.hasOwnProperty('sort')) {
            newsQuery = newsQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            newsQuery,
            news.countDocumentsWithDeleted({ deleted: true }),
        ]).then(([news, deletedCount]) => {
            res.render('news/list', {
                news: mongoosesToObject(news),
                deletedCount,
            });
        });
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
        news.deleteOne({
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
        Promise.all([
            news.findWithDeleted({ deleted: true }),
            news.countDocuments(),
        ])
            .then(([newses, newsCount]) =>
                res.render('news/trash', {
                    news: mongoosesToObject(newses),
                    newsCount,
                }),
            )
            .catch(next);
    }

    // [POST] /news/handleSelectAction
    handleSelectAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                news.delete({
                    _id: { $in: req.body.newsIds },
                })
                    .then(() => res.send('success'))
                    .catch(next);
                break;

            case 'restore':
                news.restore({
                    _id: { $in: req.body.newsIds },
                })
                    .then(() => res.send('success'))
                    .catch(next);
                break;

            case 'hardDelete':
                news.deleteOne({
                    _id: { $in: req.body.newsIds },
                })
                    .then(() => res.send('success'))
                    .catch(next);
                break;
            default:
                console.log('bug!!!');
        }
    }
}

module.exports = new NewsController();
