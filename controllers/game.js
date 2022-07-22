exports.playGame = (req, res, next) => {
    player.addPlayer()
        .then(result => {
            console.log('Generated player');
            console.log("PLAYER " + player.player)
        })
        .catch(err => {
            console.log(err);
        })

    user.addUser()
        .then(result => {
            console.log('Added User')
        })
        .catch(err => {
            console.log(err)
        })

    if (user.status) {
        console.log("PLAYER IS FOUND");
    }

    res.render('home', {
        user: user,
        players: user.guess,
        pageTitle: 'home',
        path: '/',
        guess: player.player,
    })
}

exports.updateGame = (req, res, next) => {
    // Get data from https://1678-2601-646-8500-f220-91a6-9222-51e1-ca52.ngrok.io (note need to change url when api stops running & reruns)

    fetch("https://1678-2601-646-8500-f220-91a6-9222-51e1-ca52.ngrok.io/" + req.body.player, requestOptions)
        .then(response => response.text())
        .then(
            result => updatePlayer(JSON.parse(result))
        )
        .catch(
            error => console.log("Input player properly")
        );

    const updatePlayer = (data) => {

        var today = new Date();
        var date2 = new Date(data.DOB)

        var diff = (today.getTime() - date2.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        var age = Math.abs(Math.round(diff / 365.25));

        //   var addPlayer = false

        //   if (player_names.includes(req.body.player) && player.length != 0) {
        //     console.log("SAME PLAYER IN ARRAY")
        //   } else {
        //     player_names.push(data.name)
        //     addPlayer = true
        //   }

        var height_in = parseInt(data.HtWt.slice(0, data.HtWt.indexOf("'"))) * 12 + (parseInt(data.HtWt.slice(data.HtWt.indexOf("'") + 2, data.HtWt.indexOf("'") + 3)));
        var weight_lbs = parseInt(data.HtWt.slice(data.HtWt.indexOf(",") + 2, data.HtWt.indexOf(",") + 5));
        var jersey = parseInt(data.jersey.slice(1))

        var image = null;

        if (data.jpg) {
            image = data.jpg
        }

        user.player_generated.push({
            name: req.body.player,
            conf: data.conference,
            team: data.team,
            pos: data.position,
            div: data.division,
            height: data.HtWt.slice(0, data.HtWt.indexOf(",")) + " ft",
            height_in: height_in,
            weight: data.HtWt.slice(data.HtWt.indexOf(",") + 2),
            weight_lbs: weight_lbs,
            age: age,
            jersey: jersey,
            image: image
        });

        if (data.name == player.player.name && data.conference == player.player.conf && data.team == player.player.team && data.position == player.player.pos && data.division == player.player.div && height_in == player.player.height_in && weight_lbs == player.player.weight_lbs && age == player.player.age && jersey == player.player.jersey) {
            user.status = true
        }

        res.redirect('/');
    }
}