const MetricModel = require('../models/metric-model');
const dynamoDbService = require('../services/dynamodb-service');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const getMetricData = async(req,res)=>{
    try{
        console.log(req.body)
        let {
            ips,
            from,
            to
        } = req.body;

        console.log(req.body)

        if(!from || !to){
            from = moment().subtract(6, "hours").unix();   
            to = moment().unix();   
        }else{
            from = moment(req.body.from).unix();
            to = moment(req.body.to).unix();
        }

        console.log({
            from,
            to
        })

        const timeDiff = (to - from)/60;
        let frame = Math.floor(timeDiff/30);

        if(!req.body.servers.length){
           req.body.servers = ["172.168.0.1","172.168.0.2","172.168.0.3","172.168.0.4","172.168.0.5"]
        }

        let responseData = {};
        for(const ip of req.body.servers){
            const serverMetrics = await dynamoDbService.getServerMetrics(ip, from, to);
            
            if(serverMetrics && serverMetrics.Items && serverMetrics.Items.length){
                if(!responseData[ip]){
                    responseData[ip] = {
                        labels :  [], 
                        cpu : [], 
                        disk  : [],
                        memory :[] 
                    }
                }
                serverMetrics.Items.forEach((element,index)=>{
                    if(index%frame == 0){
                        responseData[ip].labels.push(moment(element.created_at*1000).format('DD-MM HH:mm'));
                        responseData[ip].cpu.push(element.cpu);
                        responseData[ip].disk.push(element.disk);
                        responseData[ip].memory.push(element.memory);
                    }
                })
            }
        }

        return res.json({
            status: true,
            data: responseData
        })
    }catch(err){
        console.log(err)
        return res.json({
            status: false
        })
    }
}

const addMetricData = async(req,res)=>{
    try{
        const response = await dynamoDbService.addMetricDetails({
            ip: req.body.ip,
            cpu: req.body.cpu,
            memory: req.body.memory,
            disk: req.body.disk,
            date: req.body.date
        })  
        return res.json({
            status: true
        })
    }catch(err){
        return res.json({
            status: false
        })
    }
}

module.exports = {
    getMetricData,
    addMetricData
}