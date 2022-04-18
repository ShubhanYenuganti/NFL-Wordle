const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const homeData = require('./routes/home');
const howtoRoutes = require('./routes/howto')
const statsRoutes = require('./routes/stats');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", homeData.routes);
app.use(howtoRoutes);
app.use(statsRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
});

app.listen(3000);
