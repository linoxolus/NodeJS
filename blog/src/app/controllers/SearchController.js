class SearchController {
    // [GET] /search
    index(req, res, next) {
        res.render('search');
    };

    //[POST] /search
    post(req, res) {
      console.log(req.body);
      res.send(`No target matched for: "${req.body.q}"`);
    }
};

module.exports = new SearchController;