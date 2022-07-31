import axios from "axios";

const addServer = async(data)=>{
    const response =  await axios.post('/',data)
    return response.data;
}

const editServerDetails = async() =>{
    const response =  await axios.post('/',data)
    return response.data;
}

const getServersList = async() =>{
    const response =  await axios.post('/',data)
    return response.data;
}

export default {
    addServer,
    editServerDetails,
    getServersList
}