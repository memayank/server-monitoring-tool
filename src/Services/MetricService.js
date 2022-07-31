import axios from "axios";

const getMetricData = async(data)=>{
    const response =  await axios.post('http://localhost:5001/api/get-metric-data',data)
    return response.data;
}

export default{
    getMetricData
}