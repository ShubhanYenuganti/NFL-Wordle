const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Player {
    constructor(player, dateCreated, id) {
        this.player = player;
        this.dateCreated = dateCreated;
        this._id = id;
    }

    addPlayer() {
        const db = getDb();
        if (db.collection('players').find({ _id: { $exists: false } })) {
            return db.collection('players').insertOne(this)
                .then(result =>
                    console.log(result)
                )
                .catch(err => {
                    console.log(err)
                })
        }
    }

}

module.exports = Player;