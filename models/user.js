const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(guess, status, ip, games_won, games_played, id) {
        this.guess = guess; // {guess: [day1's guesses], [day 2's guesses] ... }
        this.status = status;
        this.ip = ip;
        this.games_won = games_won;
        this.games_played = games_played
        this._id = id
    }

    addUser() {
        const db = getDb();
        return db.collection('users').insertOne(this)
            .then(result =>
                console.log(result)
            )
            .catch(err => {
                console.log(err)
            })
    }

    updateUserGuess(user_guess) {
        const db = getDb();
        const updatedGuess = []
        for (let i = 0; i < this.guess.length; i++) {
            updatedGuess[i] = this.guess[i]
        }
        updatedGuess.push(user_guess)
        this.guess = updatedGuess;
        return db.collection('users').updateOne({ _id: this._id }, { $set: { guess: updatedGuess } })
    }

    updateUserStatus(bool) {
        const db = getDb();
        this.status = bool;
        return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { status: bool } })
    }

    async updateGamesPlayed() {
        const db = getDb();
        var myCount = await db.collection('users').countDocuments({ip: this.ip})

        this.games_played = myCount
    }

    async updateGamesWon() {
        const db = getDb();

        var myCount = await db.collection('users').find({"status": true}).count({"ip": this.ip})

        this.games_won = myCount
    }

}

module.exports = User;