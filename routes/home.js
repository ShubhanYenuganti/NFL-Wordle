const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const player = [];

// add-product => GET
router.get('/', (req, res, next) => {
  res.render('home', {
    players: player,
    pageTitle: 'home',
    path: '/',
    hasPlayers: this.players.length > 0
  })
});

// /admin/add-product => POST
router.post('/', (req, res, next) => {
  player.push({
    name: req.body.player
  });
  console.log(player)
  res.redirect('/');
});

exports.routes = router;
exports.players = player;