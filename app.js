const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
var cors = require('cors')
const app = express();

//connection with mongodb
mongoose.connect('mongodb://localhost:27017/ine-db')
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})
app.use(cors());
app.use(express.json())
app.use('/api', routes)


app.listen(5001, ()=>{
    console.log("server is running on port 5001")
})