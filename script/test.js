const moment = require('moment');
const MetricModel = require('../models/metric-model');
const dynamoDbService = require('../services/dynamodb-service');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ine')
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})


// const test = async ()=>{
//     try{
//         const metricData = await dynamoDbService.
//     }catch(err){
//         console.log(err);
//     }
// }

test().then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})