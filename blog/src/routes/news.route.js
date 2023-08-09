const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsController');

router.post('/store', newsController.store);
router.get('/list', newsController.list);
router.get('/upload', newsController.upload);
router.get('/:slug', newsController.show);
router.get('/:id/edit', newsController.edit);
router.delete('/:id', newsController.delete);
router.put('/:id', newsController.update);

module.exports = router;
