import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




const MetricChart = (props)=>{
    // const labels = props.metrics.labels;
    
    let labels;
    console.log("labels:",labels)

    const getDataset = ()=>{
        let data = [];
        let color = 0;
        Object.keys(props.metrics).map((key)=>{
            labels = props.metrics[key].labels;
            console.log("Keys : " ,labels)
            color = (color+ 79)%255;
            data.push({
                label: key,
                data: props.metrics[key][props.type],
                backgroundColor: `rgba(${color}, 99, 132, 0.5)`,
                borderColor: `rgb(${color}, 99, 132)`
            })
        })
        return data;
    }

    

    const data = {
        datasets: getDataset(),
        labels,
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            // position: 'top' as const,
          },
          title: {
            display: true,
            text: '',
          },
        },
      };
      


    return <Line options={options} data={data} />;

}

export default MetricChart;
