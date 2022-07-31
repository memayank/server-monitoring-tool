import axios from "axios";

const addServer = async(data)=>{
    const response =  await axios.post('http://localhost:5001/api/add-server',data)
    return response.data;
}

const editServerDetails = async(data) =>{
    const response =  await axios.post('http://localhost:5001/api/update-server',data)
    return response.data;
}

const getServersList = async(data) =>{
    const response =  await axios.get('http://localhost:5001/api/server-list')
    return response.data;
}

const deleteServer = async(data)=>{
    const response =  await axios.post('http://localhost:5001/api/delete-server',data)
    return response.data;
}

export default {
    addServer,
    editServerDetails,
    getServersList,
    deleteServer
}