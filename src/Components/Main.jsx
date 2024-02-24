import axios from 'axios';
import SimpleMap from '../AnyReactComponent';
import DirectionsApp from '../DirectionsApp';
import Switch from '../Common/Switch';
import Form from 'react-bootstrap/Form';
import { useAppDispatch } from '../store/store';
import Button from 'react-bootstrap/Button';
import { setInternationalFlight, setRentalCar, setTSAPreCheck, setBagsChecked, setIATACode, setFlightTime, setHomeToAirportStatement, setShowTimeline, setAirportToGateStatement, fetchAirportInfo, fetchAirportWaitTimes, setOriginLong, setOriginLat, setRideShare } from '../store/slice/form.slice';
import { useSelector } from 'react-redux';
import VerticalTimelineComp from './VerticalTimelineComp';
import { useEffect } from 'react';
const Main = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                dispatch(setOriginLat(position.coords.latitude))
                dispatch(setOriginLong(position.coords.longitude))

            }, (error) => {
                console.log(error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);


    const buttonClick = () => {
        dispatch(fetchAirportInfo())
        dispatch(setShowTimeline(true))
    }
    return (

        <div
            className='justify-content-center w-md-100'
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                position: "absolute",
                alignItems: "center",
                // background: "linear-gradient(90deg, rgb(237 246 239) 0%, rgb(227 235 249) 100%)"
            }}>
            <div className='lg-container w-lg-50 h-100 w-md-100 w-sm-100' style={{
                // background: "rgb(255 255 255 / 70%)"
            }}>

                <div >
                    <h1>Locogo</h1>
                    <input className='w-100 my-3 border-0' type="text" id="inputText" placeholder="IATA Code" onChange={(e) => dispatch(setIATACode(e.target.value))} />
                    <Switch label="Do you have TSA Precheck?" onChange={(e) => dispatch(setTSAPreCheck(e.target.checked))} />
                    <Switch label="Is your flight international?" onChange={(e) => dispatch(setInternationalFlight(e.target.checked))} />
                    <Switch label="Are your bags checked?" onChange={(e) => dispatch(setBagsChecked(e.target.checked))} />
                    <Switch label="Do you have to return a rental car?" onChange={(e) => dispatch(setRentalCar(e.target.checked))} />
                    <Switch label="Do you want to Ride Share?" onChange={(e) => dispatch(setRideShare(e.target.checked))} />
                    <p>What is the time of your flight?</p>
                    <input className="w-100 mb-2 border-0" type="time" id="appt" name="appt" onChange={e => dispatch(setFlightTime(e.target.value))} />
                    {/* <button type="button" id = "clickButton" onClick={buttonClick}>Get your timeline now!</button> */}
                    <Button variant="primary" type="button" id="clickButton" onClick={buttonClick}>Get your timeline now!</Button>

                    <VerticalTimelineComp />
                </div>


            </div>
        </div>

    )
}
export default Main