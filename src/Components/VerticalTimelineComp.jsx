import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Icon from '../Common/Icon';
import { useSelector } from 'react-redux';
const VerticalTimelineComp = () => {

    const homeToAirportStatement= useSelector((state)=>state.form.homeToAirportStatement)
    const airportToGateStatement= useSelector((state)=>state.form.airportToGateStatement)
    const beAtAirportStatement= useSelector((state)=>state.form.beAtAirportStatement)
    const showTimeline = useSelector((state)=>state.form.showTimeline)
    const rideShare = useSelector((state)=>state.form.rideShare)

    const test =rideShare? [
        {
            title: "Leave for the Airport",
            description: homeToAirportStatement,
            source: true,
            destination: false,
            iconClassName: "ri-car-fill",
        },
        {title:"RideShare",
        description:"Rideshare bookings coming soon",
        source: false,
        destination: false,
        iconClassName: "ri-car-fill",},
        {
            title: "Reach the Airport",
            description: beAtAirportStatement,
            iconClassName: "ri-building-fill",
            source: false,
            destination: false,
        },
        {
            title: "Reach your Flight Terminal and Relax",
            description: airportToGateStatement,
            iconClassName: "ri-plane-fill",
            source: false,
            destination: true,

        },
    ]:[{
        title: "Leave for the Airport",
        description: homeToAirportStatement,
        source: true,
        destination: false,
        iconClassName: "ri-car-fill",
    },
    {
        title: "Reach the Airport",
        description: beAtAirportStatement,
        iconClassName: "ri-building-fill",
        source: false,
        destination: false,
    },
    
    {
        title: "Reach your Flight Terminal and Relax",
        description: airportToGateStatement,
        iconClassName: "ri-plane-fill",
        source: false,
        destination: true,

    },]

    return (
<>
      {showTimeline &&  <VerticalTimeline layout='1-column-left' lineColor='black'>

            {test.map((data) => {
                return <VerticalTimelineElement
                    date={data.time}
                    className="vertical-timeline-element--work"
                    iconStyle={{ background: `${data.source ? '#d2e7d6' : data.destination ? '#f97c7c' : 'rgb(33, 150, 243)'}`, color: 'black' }}
                    icon={<Icon className={data.iconClassName} />}
                >
                    <h3 className="vertical-timeline-element-title">{data.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{data.subTitle}</h4>
                    <p>
                        {data.description}
                    </p>
                </VerticalTimelineElement>
            })}

        </VerticalTimeline>}
        </>
    )
}
export default VerticalTimelineComp