const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')
const mongoConnect = require('./util/database').mongoConnect
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const homeData = require('./routes/home');
const howtoRoutes = require('./routes/howto')

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", homeData.routes);
app.use(howtoRoutes);
app.use(errorController.get404)

mongoConnect(() => {
    app.listen(4000)
})

