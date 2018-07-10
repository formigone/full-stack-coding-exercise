const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('../config');
const routes = require('./routes');
const { Flag } = require('./models');

mongoose.connect(`${config.mongodb.url}/${config.mongodb.dbName}`, { useNewUrlParser: true });

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use('/js', express.static('js'));

routes(app, { Flag });

app.listen(3000, () => console.log('Example app listening on port 3000!'));
