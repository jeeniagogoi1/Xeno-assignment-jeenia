const mongoose = require('mongoose')

const connectDB = async (req) => {
    return mongoose.connect("mongodb://127.0.0.1/sampleDb",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("Database Connection Established...")).catch((error)=>console.log(`Database Connection Failed \n Error : ${error}`))
}

module.exports = connectDB