const moment = require('moment');
const MetricModel = require('../models/metric-model');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ine-db')
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})
const storeData = async()=>{
    try{ 
        const metric = new MetricModel({
            ip_address: "172.168.144.72",
            date: moment().utc().startOf("minute").toDate(),
            cpu_useage: Math.floor(Math.random()*50)+50,
            memory_useage: Math.floor(Math.random()*50)+50,
            disk_useage: Math.floor(Math.random()*50)+50
        })
        await metric.save()
        return metric;
    }catch(err){
        console.log(err);
        return false
    }
}

const populate = async()=>{
    try{
        for(let i=0;i<100;i++){
            setTimeout(()=>{

                storeData().then(data=>{
                    console.log("Created new record", data)
                })
            },60000*i)
        }
    }catch(err){
        return false;
    }
}


populate().then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err);
})