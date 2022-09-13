const mongoose = require('mongoose');

const connectDB = async (uri) => {
   await mongoose
        .connect(uri)
        .then(() => console.log('Connected to the DB...'))
        .catch((err) => console.log(err));
}

module.exports = connectDB;