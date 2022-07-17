const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://adminuser:EiHiT93hOkoLXF6j@cluster0.gfk68aq.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected')
        callback(client)
    })
    .catch(err => console.log(err))
}

module.exports = mongoConnect