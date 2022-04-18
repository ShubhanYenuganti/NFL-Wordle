const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/howtoplay', (req, res, next) => {
  res.render('howto', {pageTitle: 'How to Play', path :'/howtoplay'})
});

module.exports = router;
