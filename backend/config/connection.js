const mongoose = require('mongoose')
require("dotenv").config()

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("connected to mongodb")
})