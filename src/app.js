require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();

const indexRoute = require('./app/routes/index.routes');
const usersRoute = require('./app/routes/users.routes');
const authRoute = require('./app/routes/auth.routes');
const teams = require('./app/routes/teams.routes');
const line = require('./app/routes/line.routes');


app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
    '/files',
    express.static(path.resolve(__dirname, 'tmp', 'uploads'))
);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    next();
});


app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/teams', teams);
app.use('/line', line);



module.exports = app;