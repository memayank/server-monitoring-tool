const AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-south-1",
    accessKeyId:"AKIA6CHP2LFOXJFNP2RO",
    secretAccessKey:"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"
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();


const getServersList = async() =>{
    try{
        const params = {
            TableName:"servers",
            Key:{
                deleted: false
            }
        }
        const response = await dynamoDb.scan(params).promise();
        return response.Items;
    }catch(err){
        console.log(err);
    }
}

const addOrUpdateServer =async(item)=>{
    try{
        const params = {
            TableName:"servers",
            Item:item
        }
        const response = await dynamoDb.put(params).promise();
        return response;
    }catch(err){
        console.log(err);
        return false;
    }
}

const addMetricDetails = async(item)=>{
    try{
        const params = {
            TableName:"metrics",
            Item: item
        }
        const response = await dynamoDb.put(params).promise();
        return response;
    }catch(err){
        console.log(err)
    }
}

// addMetricDetails({
//     ip: "172.168.0.1",
//     date: 1,
// }).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log(err);
// })


const getServerMetrics =async(ip, from, to)=>{
    try{
        const params = {
            TableName:"metrics",
            // Select: "ALL_ATTRIBUTES",
            KeyConditionExpression: 'ip = :server_ip and created_at BETWEEN :from and :to',
            ExpressionAttributeValues: {
                ":server_ip": ip,
                ":from": from,
                ":to": to
            },
        }
        const response = await dynamoDb.query(params).promise();
        return response;
    }catch(err){
        console.log(err);
    }
}

// getServerMetrics("172.168.0.1",1660384360,1660384450).then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err);
// })

module.exports ={
    getServersList,
    addOrUpdateServer,
    getServerMetrics,
    addMetricDetails
}