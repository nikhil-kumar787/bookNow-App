const mongoose = require('mongoose');

const dbConnect = () => {
    if(mongoose.connection.readyState >= 1) {
        return
    }

    mongoose.connect(process.env.DB_LOCAL_URI,
        err => {
            if(err) throw err;
            console.log('connected to MongoDB')
        });
}

module.exports = dbConnect
