const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/howtoplay', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'howto.html'));
});

module.exports = router;
