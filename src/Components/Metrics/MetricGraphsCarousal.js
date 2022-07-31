import React, { useState,useEffect } from 'react';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import MetricChart from './MetricChart';


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

const MetricGraphsCarousal = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    
    const onExiting = ()=> {
      // setAnimating(true);
    }

    const onExited = ()=>{
      setAnimating(false);
    }

    const next = ()=> {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }

    const previous = () =>{
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex)=>{
      if (animating) return;
      setActiveIndex(newIndex);
    }

    const typeMap = {
      cpu: "CPU Usage",
      memory: "Memory Usage", 
      disk: "Disk Usage"
    }


    return <>
      
    <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {
                items.map((item) => {
                    return (
                      
                    <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key={item.src}
                    >
                      <h3>{typeMap[item.type]}</h3>
                        <MetricChart
                        
                          metrics= {props.metrics}
                          type={item.type}
                        />


                        <CarouselCaption className='captions' captionText={item.caption} captionHeader={item.caption} />
                    </CarouselItem>
                    );
                })
          }
        <CarouselControl  direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </>

}
export default MetricGraphsCarousal;

