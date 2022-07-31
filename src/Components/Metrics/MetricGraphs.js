import React, { useEffect, useState } from 'react';
import MetricGraphsCarousal from './MetricGraphsCarousal';
import MetricGraphsList from './MetricGraphsList';
import MetricServices from '../../Services/MetricService';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './metric.css'
import { Button } from 'reactstrap';

const MetricGraphs = () =>{



    const [layout, setLayout] = useState("Carousal");
    const [startTime, setStartTime] = useState(false);
    const [endTime, setEndTime] = useState(false);
    const [search, setSearch] = useState(false)


    const [metrics, setMetrics]= useState({
        cpu : [],
        memory: [],
        disk: [],
        labels : []
    })

    useEffect(()=>{
        (async()=>{
            const response = await MetricServices.getMetricData({
                from: startTime,
                to: endTime
            });

            if(response.status){
                console.log("metric response",response);
                setMetrics(response.resdata);
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
    return (
        <>
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