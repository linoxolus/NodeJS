class SearchController {
    // [GET] /search
    index(req, res, next) {
        res.render('search');
    }

    //[POST] /search
    post(req, res, next) {
        res.send(`No target matched for: "${req.body.q}"`);
    }

    // [GET] /search/:slug
    show(req, res, next, id) {}
}

module.exports = new SearchController();
