const mongoose = require("mongoose");
require("dotenv").config();

const DB_URl = process.env.DB_URL
const DB_NAME = process.env.DB_NAME

mongoose.connect(`${DB_URl}${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

module.exports = mongoose