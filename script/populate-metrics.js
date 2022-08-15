const dynamoDbService = require('../services/dynamodb-service');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const populateMetrics = async()=>{
    try{

        const date = 1660381320;
        const ITERATION_COUNT = 3*24*60;

        const servers = ["172.168.0.5"];

        for(const server of servers){
            for(let i =0 ;i<ITERATION_COUNT;i++){
                await dynamoDbService.addMetricDetails({
                    id:uuidv4(),
                    ip: server,
                    created_at: (date +i*60),
                    cpu: Math.floor(Math.random()*500)+500,
                    memory: Math.floor(Math.random()*50)+50,
                    disk: Math.floor(Math.random()*50)+50
                })
                console.log(server, i);
            }
        }
        return "done";
    }catch(err){
        console.log(err);
    }
}

populateMetrics().then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})