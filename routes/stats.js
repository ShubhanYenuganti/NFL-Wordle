const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/stats', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'stats.html'));
});

module.exports = router;
