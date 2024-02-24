import { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Icon from '../Common/Icon';
import { useSelector } from 'react-redux';
const VerticalTimelineComp = () => {




    function convertTo12HrFormat(time) {
        let [hours, minutes] = time.split(":");
        let period = +hours < 12 ? 'AM' : 'PM';
        hours = +hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }






    const airportToGateStatement = useSelector((state) => state.form.airportToGateStatement)
    const FlightTime = useSelector(state => state.form.FlightTime)
    const showTimeline = useSelector((state) => state.form.showTimeline)
    const rideShare = useSelector((state) => state.form.rideShare)
    const leaveFromHome = useSelector((state) => state.form.leaveFromHome)
    const reachAirportBy = useSelector(state => state.form.reachAirportBy)
    const TSAPreCheck = useSelector(state => state.form.TSAPreCheck)
    const InternationalFlight = useSelector(state => state.form.InternationalFlight)
    const BagsChecked = useSelector(state => state.form.BagsChecked)
    const RentalCar = useSelector(state => state.form.RentalCar)






    const test = [
        {
            id: 1,
            title: "Leave for the Airport",
            description: `You should leave for the airport by ${leaveFromHome}`,
            source: true,
            destination: false,
            iconClassName: "ri-car-fill",
        },
        {
            id: 2,
            title: "RideShare",
            description: "Rideshare bookings coming soon",
            source: false,
            destination: false,
            iconClassName: "ri-car-fill",
        },

        {
            id: 3,
            title: "Reach the Airport",
            description: `You should reach Airport by ${reachAirportBy}`,
            iconClassName: "ri-building-fill",
            source: false,
            destination: false,
        },
        {
            id: 4,
            title: "Lounge",
            description: "Lounge details coming soon",
            source: false,
            destination: false,
            iconClassName: "ri-building-fill",
        },
        {
            id: 7,
            title: "Reach your Flight Terminal and Relax",
            description: `Your flight time is ${convertTo12HrFormat(FlightTime)}`,
            iconClassName: "ri-plane-fill",
            source: false,
            destination: true,

        },
    ]



    return (
        <>
            {showTimeline && <VerticalTimeline animate={false} layout='1-column-left' lineColor='black'>

                {
                    test?.sort((a, b) => a.id - b.id).map((data, index) => {
                        return <VerticalTimelineElement

                            date={data.time}
                            key={index}
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
                    })

                }

            </VerticalTimeline>}
        </>
    )
}
export default VerticalTimelineComp