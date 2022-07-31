const ServerModel = require('../models/server-model');
const moment = require('moment');
const addServer = async(req,res)=>{
    try{

        const server = new ServerModel({
            ip_address: req.body.ipAddress,
            server_name: req.body.serverName,
            date: moment().utc().toDate()
        })
        await server.save();
        return res.json({
            status: true,
            msg: "New server added"
        })
    }catch(err){
        return res.json({
            staus: false,
            msg: "Unable to add new server"
        })
    }
}

const editServerDetails = async(req,res)=>{
    try{
        const server = await ServerModel.findOne({
            _id: req.body.serverId
        })
        if(req.body.serverName){
            server.server_name = req.body.serverName;
        }
        if(req.body.ipAddress){
            server.ip_address = req.body.ipAddress;
        }
        return res.json({
            staus: true,
            msg: "Server details updated"
        })
    }catch(err){
        return res.json({
            staus: false,
            msg: "Unable to update server details"
        })
    }
}

const getServersList = async(req,res)=>{
    try{

    }catch(err){
        return res.json({
            staus: false,
            msg: "Unable to add new server"
        })
    }
}

module.exports = {
    addServer,
    editServerDetails,
    getServersList
}