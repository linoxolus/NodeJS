const express = require('express');
const router = express.Router();
const searchController = require('../app/controllers/SearchController');

router.get('/:slug', searchController.show);
router.get('/', searchController.index);
router.post('/', searchController.post);

module.exports = router;
