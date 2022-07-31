const MetricModel = require('../models/metric-model');

const moment = require('moment');

const getMetricData = async(req,res)=>{
    try{
    
        let startTime = moment().utc().subtract(6, "hours").toDate();

        let endTime = moment().utc().toDate();

        if(req.body.from){
            startTime = moment(req.body.from).utc().toDate();
        }
        if(req.body.to){
            endTime = moment(req.body.to).utc().toDate();
        }
        const difference = moment(endTime).diff(startTime, 'minute');
    

        const interval = difference/50;
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
            },
            {
                $sort: {
                    date: 1
                }
            }
        ])
        let resdata = {};
        metricData.forEach(data=>{
            if(!resdata[data._id.ip_address]){
                resdata[data._id.ip_address] = {
                    labels :  [], 
                    cpu : [], 
                    disk  : [],
                    memory :[] 
                }
            }
            resdata[data._id.ip_address].labels.push(moment(data.date).format('LT'));
            resdata[data._id.ip_address].cpu.push(data.cpu);
            resdata[data._id.ip_address].disk.push(data.disk);
            resdata[data._id.ip_address].memory.push(data.memory);
        })
        console.log(resdata)
        return res.json({
            status: true,
            resdata
        })
    }catch(err){
        console.log(err)
        return res.json({
            status: false
        })
    }
}

const addMetricData = (req,res)=>{
    try{

    }catch(err){

    }
}

module.exports = {
    getMetricData,
    addMetricData
}