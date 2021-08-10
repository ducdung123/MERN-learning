const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-pj.zlepw.mongodb.net/MERN-PJ?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("success")
    }
    catch (err) {
        console.log("false");
        process.exit(1)
    }
}

module.exports = { connect };