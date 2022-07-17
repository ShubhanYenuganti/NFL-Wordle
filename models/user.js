const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

const ObjectID = mongodb.ObjectId;

class User {
    constructor(ip, guess, id)
    {
        this.ip = ip;
        this.guess = guess;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }
}