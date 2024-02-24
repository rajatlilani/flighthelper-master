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
import Navbar from './NavbarComp';
import NavbarComp from './NavbarComp';
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
            style={{
                // height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
            }}>
            <h1>Locogo</h1>     <div
                className='justify-content-center p-3'
                style={{
                    display: "flex",
                    width: "100%",
                    // height: "100%",
                    // position: "absolute",
                    alignItems: "center",
                    // background: "linear-gradient(90deg, rgb(237 246 239) 0%, rgb(227 235 249) 100%)"
                }}>
                <div className='' style={{
                    // background: "rgb(255 255 255 / 70%)"
                }}>

                    <div >
                        {/* <NavbarComp /> */}

                        {/* <input className='w-100 my-3 border-0' type="text" id="inputText" placeholder="IATA Code" onChange={(e) => dispatch(setIATACode(e.target.value))} /> */}
                        <Form.Control size="lg" type="text" placeholder="IATA Code" onChange={(e) => dispatch(setIATACode(e.target.value))} />

                        <Switch label="Do you have TSA Precheck?" onChange={(e) => dispatch(setTSAPreCheck(e.target.checked))} />
                        <Switch label="Is your flight international?" onChange={(e) => dispatch(setInternationalFlight(e.target.checked))} />
                        <Switch label="Are your bags checked?" onChange={(e) => dispatch(setBagsChecked(e.target.checked))} />
                        <Switch label="Do you have to return a rental car?" onChange={(e) => dispatch(setRentalCar(e.target.checked))} />
                        <Switch label="Do you want to Ride Share?" onChange={(e) => dispatch(setRideShare(e.target.checked))} />
                        <label className="my-2" style={{ fontSize: "1.2rem" }}>What is the time of your flight?</label>
                        {/* <input className="w-100 mb-2 border-0" type="time" id="appt" name="appt" onChange={e => dispatch(setFlightTime(e.target.value))} /> */}
                        <Form.Control size="lg" type="time" onChange={e => dispatch(setFlightTime(e.target.value))} />
                        {/* <button type="button" id = "clickButton" onClick={buttonClick}>Get your timeline now!</button> */}

                        <VerticalTimelineComp />
                    </div>


                </div>
            </div>
            <div>
                <Button variant="primary" className='my-2' size="lg" type="button" id="clickButton" onClick={buttonClick}>Get your timeline now!</Button>
            </div>
        </div>


    )
}
export default Main