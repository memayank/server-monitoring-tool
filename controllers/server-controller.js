const ServerModel = require('../models/server-model');
const dynamoDbService = require('../services/dynamodb-service');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const addServer = async(req,res)=>{
    try{
        const response = await dynamoDbService.addOrUpdateServer({
            id:uuidv4(),
            ip: req.body.ip,
            name: req.body.name,
            status: req.body.status,
            date: moment().utc().unix(),
            deleted: false
        })
        return res.json({
            status: true,
            msg: "New server added"
        })
    }catch(err){
        console.log(err)
        return res.json({
            status: false,
            msg: "Unable to add new server"
        })
    }
}

const editServerDetails = async(req,res)=>{
    try{    
        // console.log("editServerDetails ", req.body);


        const server = await dynamoDbService.addOrUpdateServer({
            id:req.body.id,
            ip: req.body.ip,
            name: req.body.name,
            status: req.body.status,
            date:req.body.date,
            deleted: false
        })
        return res.json({
            status: true,
            msg: "Server details updated"
        })
    }catch(err){
        return res.json({
            status: false,
            msg: "Unable to update server details"
        })
    }
}

const getServersList = async(req,res)=>{
    try{
        const servers = await dynamoDbService.getServersList();
        // console.log(servers)
        if(servers){
            return res.json({
                status: true,
                servers
            })
        }
        return res.json({
            status: true,
            servers:[]
        })
    }catch(err){
        return res.json({
            staus: false,
            msg: "Unable to add new server"
        })
    }
}

const deleteServer = async(req,res)=>{
    try{
        // console.log(req.body,"delete")
        const server = await dynamoDbService.addOrUpdateServer({
            id:req.body.id,
            ip: req.body.ip,
            name: req.body.name,
            status: req.body.status,
            date: req.body.date,
            deleted: true
        })
        // console.log(server)

        return res.json({
            status: true,
            msg: "Server deleted"
        })
    }catch(err){
        return res.json({
            staus: false,
            msg: "Unable delete server"
        })
    }
}

module.exports = {
    addServer,
    editServerDetails,
    getServersList,
    deleteServer
}