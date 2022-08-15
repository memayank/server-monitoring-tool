import React, { useEffect, useState } from 'react';
import MetricGraphsCarousal from './MetricGraphsCarousal';
import MetricGraphsList from './MetricGraphsList';
import MetricServices from '../../Services/MetricService';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ServerService from '../../Services/ServerService';
import './metric.css'
import { Button } from 'reactstrap';

const MetricGraphs = () =>{
    const [layout, setLayout] = useState("Carousal");
    const [startTime, setStartTime] = useState(false);
    const [endTime, setEndTime] = useState(false);
    const [search, setSearch] = useState(false)
    const [serverList, setServersList] = useState([]);
    const [serverSelectionStatus, setServerSelectionStatus] = useState({});
    const [selectedServerList, setSelectedServerList] = useState([]);
    const [metrics, setMetrics]= useState({
        cpu : [],
        memory: [],
        disk: [],
        labels : []
    })

    useEffect(()=>{
        (async()=>{
            const serverResponse = await ServerService.getServersList();
            if(serverResponse){
                console.log("Server Response", serverResponse)
                // setSearch(!search);
              setServersList(serverResponse.servers)
            }
        })()
    })

    useEffect(()=>{
        (async()=>{
            
            let tempServer = [];
            if(Object.keys(serverSelectionStatus).length == 0){
                let  i=0;
                serverList.forEach(server=>{
                    if(i<5){
                        tempServer.push(server.ip);
                        i++;
                    }
                })
            }else{
                Object.keys(serverSelectionStatus).forEach(key=>{
                    if(serverSelectionStatus[key]){
                        tempServer.push(key);
                    }
                })
            }
            const response = await MetricServices.getMetricData({
                servers:tempServer,
                from: startTime,
                to: endTime
            });
            

            if(response.status){
                console.log("metric response",response);
                setMetrics(response.data);
            }
        })()
    },[search])

    const onStartTimeChange =(event)=>{
        setStartTime(event.target.value)
    }
    const onEndTimeChange =(event)=>{
        setEndTime(event.target.value)
    }
    const handleSearch =() =>{
        setSearch(!search)
    }
    const changeLayout = ()=>{
        if(layout ==="Carousal"){
            setLayout("Listing")

        }else{
            setLayout("Carousal")
        }
    }
    const handleCheckboxChange = (event)=>{
        setServerSelectionStatus({
            ...serverSelectionStatus,
            [event.target.name]: !serverSelectionStatus[event.target.name]
        })
        console.log("serverSelectionStatus",serverSelectionStatus)
    }
    return (
        <>
            {   
                serverList.map((server)=>{
                    return !server.deleted ? <div>
                       <div>
                        <label>
                            <input type="checkbox" name={server.ip} onChange={handleCheckboxChange} checked={serverSelectionStatus[server.ip] || false }/>
                            {server.name}
                        </label>
                        </div>
                    </div>: null
                })
            }

            From <input type="datetime-local" onChange={onStartTimeChange}/>
            To <input type="datetime-local" onChange={onEndTimeChange}/>
            <Button onClick={handleSearch}>Search</Button>
            <div></div>

            <Button onClick={changeLayout}>{layout}</Button>
            {layout ==="Carousal"? <MetricGraphsCarousal metrics ={metrics} />:  <MetricGraphsList  metrics ={metrics}/>}
        </>
    )
}

export default MetricGraphs;