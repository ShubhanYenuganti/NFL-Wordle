const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/stats', (req, res, next) => {
  res.render('stats', {pageTitle: 'Your Stats', path: '/stats'})
});

module.exports = router;
