const express = require('express');
const mongoose = require('mongoose');
const app = express();

//connection with mongodb
mongoose.connect('mongodb://localhost:27017/ine')
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})

app.use(express.json())

app.listen(5001, ()=>{
    console.log("server is running on port 5001")
})