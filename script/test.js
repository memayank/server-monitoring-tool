const moment = require('moment');
const MetricModel = require('../models/metric-model');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ine')
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})


const test = async ()=>{
    try{
        const startTime = moment().utc().subtract(6, "hours").toDate();

        const endTime = moment().utc().toDate();

        const difference = moment(endTime).diff(startTime, 'minute');

        const interval = difference/20;
        const metricData = await MetricModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: startTime,
                        $lte: endTime
                    }
                }
            },{
                $group:{
                    _id: {
                        year: {"$year": "$date"},
                        "dayOfYear": { "$dayOfYear": "$date" },
                        "hour": { "$hour": "$date" },
                        ip_address: "$ip_address",
                        "minute": {
                            "$subtract": [
                                { "$minute": "$date" },
                                { "$mod": [ { "$minute": "$date" }, interval ] }
                            ]
                        }

                    },
                    count: {
                        $sum: 1
                    },
                    cpu: {
                        $avg: "$cpu_useage"
                    },
                    disk: {
                        $avg: "$disk_useage"
                    },
                    memory: {
                        $avg: "$memory_useage"
                    },
                    date:{
                        $first: "$date"
                    }
                }
            }
        ])

        return metricData;
    }catch(err){
        console.log(err);
    }
}

test().then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})