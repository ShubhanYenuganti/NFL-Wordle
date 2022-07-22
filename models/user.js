const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(guess, status, id) {
        this.guess = guess; // {guess: [day1's guesses], [day 2's guesses] ... }
        this.status = status;
        this._id = id;
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
        this.status = true;
        return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { status: bool } })
    }

    static getUser(ip) {
        const db = getDb();
        return db.collection('users').find({ip: ip})
            .next()
            .then(user => {
                return user;
            })
    }
}

module.exports = User;