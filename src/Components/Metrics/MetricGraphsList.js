import React from 'react';
import MetricChart from './MetricChart';

const MetricGraphsList =(props) =>{
    const items = [
        {
          type:"cpu",
          altText: 'CPU Usage',
          caption: 'CPU Usage'
        },
        {
          type:"memory",
          altText: 'Memory Usage',
          caption: 'Memory Usage'
        },
        {
          type:"disk",
          altText: 'Disk Usage',
          caption: 'Disk Usage'
        }
      ];
      const typeMap = {
        cpu: "CPU Usage",
        memory: "Memory Usage", 
        disk: "Disk Usage"
      }
      
      return <>

        {
            items.map((item) => (
                <>
                <h3>{typeMap[item.type]}</h3>
                    <MetricChart
                        metrics= {props.metrics}
                        type={item.type}
                    />
                </>
            ))
        }
      </>

}

export default MetricGraphsList;