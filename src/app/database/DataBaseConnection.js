const mongoose = require('mongoose');
const configs = require('../config/configs')

mongoose.connect(
    configs.DATABASE,
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