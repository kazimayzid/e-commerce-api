const mongoose = require("mongoose");

function dbConnection () {
    mongoose.connect(process.env.DATABASE_URL).then(() =>{
        console.log("db connected");
        
    })
}

module.exports = dbConnection