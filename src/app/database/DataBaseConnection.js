const mongoose = require('mongoose');
const config = require('../config/configs')

mongoose.connect(
    config.CONNECTIONDATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => console.log('Connected to the Rype Corporation database sucess'));

module.exports = mongoose;