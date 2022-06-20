const fetch = require('node-fetch')

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const {
  json
} = require('body-parser');

const router = express.Router();

const player = [];
const player_names = [];

const answer = [];
const pos = [
  'QB',
  'RB',
  'WR',
  'TE',
  'T',
  'G',
  'C',
  'DE',
  'DT',
  'LB',
  'CB',
  'S',
  'PK',
  'P'
]

const random_pos = pos[Math.floor(Math.random() * 14)];

fetch("https://d5f6-73-93-10-13.ngrok.io/all/" + random_pos, requestOptions)
  .then(response => response.text())
  .then(
    result => updateGuess(JSON.parse(result))
  )
  .catch(
    error => console.log("API request failure or you didn't enter a valid input")
  );

const updateGuess = (data) => {

  // Conference (0 or 1)
  const rand_conf = Math.floor(Math.random() * 2)
  // Division (0,1,2,3)
  const rand_div = Math.floor(Math.random() * 4)
  // Team (0,1,2,3)
  const rand_team = Math.floor(Math.random() * 4)

  // IF WR:
  // Player (0,1,2)
  if (random_pos == "WR") {
    const rand_player = Math.floor(Math.random() * 3)
    addGuess(data[rand_conf][rand_div][rand_team][rand_player]);
  }

  // IF T, G, DE, CB, S:
  // Player (0,1)

  if (random_pos == "T" || random_pos == "G" || random_pos == "DE" || random_pos == "CB" || random_pos == "S") {
    const rand_player = Math.floor(Math.random() * 2)

    addGuess(data[rand_conf][rand_div][rand_team][rand_player])
  }

  // DT
  // Teams w/NT -- Player (0)
  // Teams w/out NT -- Player (0,1)

  if (random_pos == "DT") {
    if (rand_conf == 0) {
      if (rand_div == 0) {
        if (rand_team == 1) {
          addGuess(data[rand_conf][rand_div][rand_team])
        } else {
          const rand_player = Math.floor(Math.random() * 2)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 1) {
        if (rand_team == 0 || rand_team == 3) {
          addGuess(data[rand_conf][rand_div][rand_team])
        } else {
          const rand_player = Math.floor(Math.random() * 2)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 2) {
        if (rand_team == 0 || rand_team == 3) {
          addGuess(data[rand_conf][rand_div][rand_team])
        } else {
          const rand_player = Math.floor(Math.random() * 2)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 3) {
        if (rand_team == 2 || rand_team == 3) {
          addGuess(data[rand_conf][rand_div][rand_team])
        } else {
          const rand_player = Math.floor(Math.random() * 2)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      }
    } else if (rand_conf == 1) {
      if (rand_div == 0) {
        if (rand_team == 1) {
          addGuess(data[rand_conf][rand_div][rand_team])
        } else {
          const rand_player = Math.floor(Math.random() * 2)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 1) {
        if (rand_team == 0 || rand_team == 1) {
          addGuess(data[rand_conf][rand_div][rand_team])
        } else {
          const rand_player = Math.floor(Math.random() * 2)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 2) {
        if (rand_team == 2 || rand_team == 3) {
          addGuess(data[rand_conf][rand_div][rand_team])
        } else {
          const rand_player = Math.floor(Math.random() * 2)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 3) {
        if (rand_team == 0 || rand_team == 3) {
          addGuess(data[rand_conf][rand_div][rand_team])
        } else {
          const rand_player = Math.floor(Math.random() * 2)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      }
    }
  }


  // LB
  // Teams w/NT -- Player (0,1,2,3)
  // Teams w/out NT -- Player (0,1,2)

  if (random_pos == "LB") {
    if (rand_conf == 0) {
      if (rand_div == 0) {
        if (rand_team == 1) {
          const rand_player = Math.floor(Math.random() * 4)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        } else {
          const rand_player = Math.floor(Math.random() * 3)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 1) {
        if (rand_team == 0 || rand_team == 3) {
          const rand_player = Math.floor(Math.random() * 4)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        } else {
          const rand_player = Math.floor(Math.random() * 3)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 2) {
        if (rand_team == 0 || rand_team == 3) {
          const rand_player = Math.floor(Math.random() * 4)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        } else {
          const rand_player = Math.floor(Math.random() * 3)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 3) {
        if (rand_team == 2 || rand_team == 3) {
          const rand_player = Math.floor(Math.random() * 4)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        } else {
          const rand_player = Math.floor(Math.random() * 3)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      }
    } else if (rand_conf == 1) {
      if (rand_div == 0) {
        if (rand_team == 1) {
          const rand_player = Math.floor(Math.random() * 4)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        } else {
          const rand_player = Math.floor(Math.random() * 3)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 1) {
        if (rand_team == 0 || rand_team == 1) {
          const rand_player = Math.floor(Math.random() * 4)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        } else {
          const rand_player = Math.floor(Math.random() * 3)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 2) {
        if (rand_team == 2 || rand_team == 3) {
          const rand_player = Math.floor(Math.random() * 4)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        } else {
          const rand_player = Math.floor(Math.random() * 3)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      } else if (rand_div == 3) {
        if (rand_team == 0 || rand_team == 3) {
          const rand_player = Math.floor(Math.random() * 4)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        } else {
          const rand_player = Math.floor(Math.random() * 3)
          addGuess(data[rand_conf][rand_div][rand_team][rand_player])
        }
      }
    }
  }

  if (random_pos == "QB" || random_pos == "TE" || random_pos == "RB" || random_pos == "C" || random_pos == "PK" || random_pos == "P") {
    addGuess(data[rand_conf][rand_div][rand_team])
  }

}


const addGuess = (guess) => {
  var today = new Date();
  var date2 = new Date(guess.DOB)

  var diff = (today.getTime() - date2.getTime()) / 1000;
  diff /= (60 * 60 * 24);
  var age = Math.abs(Math.round(diff / 365.25));

  answer.push({
    name: guess.name,
    conf: guess.conference,
    team: guess.team,
    pos: guess.position,
    div: guess.division,
    height: guess.HtWt.slice(0, guess.HtWt.indexOf(",")) + " ft",
    height_in: parseInt(guess.HtWt.slice(0, guess.HtWt.indexOf("'"))) * 12 + (parseInt(guess.HtWt.slice(guess.HtWt.indexOf("'") + 2, guess.HtWt.indexOf("'") + 3))),
    weight: guess.HtWt.slice(guess.HtWt.indexOf(",") + 2),
    weight_lbs: parseInt(guess.HtWt.slice(guess.HtWt.indexOf(",") + 2, guess.HtWt.indexOf(",") + 5)),
    age: age,
    jersey: parseInt(guess.jersey.slice(1))
  });

  console.log(answer[0])
}

// add-product => GET
router.get('/', (req, res, next) => {
  res.render('home', {
    players: player,
    pageTitle: 'home',
    path: '/',
    guess: answer[0]
  })
});

// /admin/add-product => POST
router.post('/', (req, res, next) => {
  // Get data from https://73b7-73-93-10-13.ngrok.io (note need to change url when api stops running & reruns)

  fetch("https://d5f6-73-93-10-13.ngrok.io/" + req.body.player, requestOptions)
    .then(response => response.text())
    .then(
      result => updatePlayer(JSON.parse(result))
    )
    .catch(
      error => console.log("API request failed or you didn't enter a valid input")
    );

  const updatePlayer = (data) => {

    var today = new Date();
    var date2 = new Date(data.DOB)

    var diff = (today.getTime() - date2.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    var age = Math.abs(Math.round(diff / 365.25));

    var addPlayer = false

    if (player_names.includes(req.body.player) && player.length != 0) {
      console.log("SAME PLAYER IN ARRAY")
    } else {
      player_names.push(data.name)
      addPlayer = true
    }

    if (addPlayer) {
      player.push({
        name: req.body.player,
        conf: data.conference,
        team: data.team,
        pos: data.position,
        div: data.division,
        height: data.HtWt.slice(0, data.HtWt.indexOf(",")) + " ft",
        height_in: parseInt(data.HtWt.slice(0, data.HtWt.indexOf("'"))) * 12 + (parseInt(data.HtWt.slice(data.HtWt.indexOf("'") + 2, data.HtWt.indexOf("'") + 3))),
        weight: data.HtWt.slice(data.HtWt.indexOf(",") + 2),
        weight_lbs: parseInt(data.HtWt.slice(data.HtWt.indexOf(",") + 2, data.HtWt.indexOf(",") + 5)),
        age: age,
        jersey: parseInt(data.jersey.slice(1))
      });
    }
    res.redirect('/');
  }
}

);


exports.routes = router;
exports.players = player;