import axios from 'axios';
import SimpleMap from '../AnyReactComponent';
import DirectionsApp from '../DirectionsApp';
import Switch from '../Common/Switch';
import Form from 'react-bootstrap/Form';
import { useAppDispatch } from '../store/store';
import Button from 'react-bootstrap/Button';
import { setInternationalFlight, setRentalCar, setTSAPreCheck, setBagsChecked, setIATACode, setFlightTime, setHomeToAirportStatement, setShowTimeline, setAirportToGateStatement } from '../store/slice/form.slice';
import { useSelector } from 'react-redux';
import VerticalTimelineComp from './VerticalTimelineComp';
const Main = () => {
    const dispatch = useAppDispatch()


    /*Variables for buffer algorithm
Total buffer is the total buffer amount, is calculated through the if statements
Precheck is a boolean that equates to whether or not the user has TSA Precheck
International is a boolean that equates to whether or not the user's flight is international
BagsAreChecked is a boolean that equates to whether or not the user's bags are checked
ReturnRentalCar is a boolean that equates to whether or not the user has to return a rental car
These values are all found from the user's HTML input
*/
    var totalBuffer = 0;
    var precheck;
    var international;
    var bagsAreChecked;
    var returnRentalCar;
    //Initialization to be able to call the API received data from outside of the functions
    var realResponse;
    var realResponse1;
    //Initialization for Airplane ID and time of the flight based on user input
    var airplaneID = "";
    var timeControl = "";
    // const button = document.getElementById("clickButton");
    // button.addEventListener("click", async function () {
    //     airplaneID = document.getElementById('inputText').value;
    //     timeControl = document.querySelector('input[type="time"]');
    //     const precheckButtons = document.querySelectorAll('input[name="Precheck"]');
    //     for (const radioButton of precheckButtons) {
    //         if (radioButton.checked) {
    //             precheck = radioButton.value;
    //             break;
    //         }
    //     }
    //     const internationalButtons = document.querySelectorAll('input[name="International"]');
    //     for (const radioButton of internationalButtons) {
    //         if (radioButton.checked) {
    //             international = radioButton.value;
    //             break;
    //         }
    //     }
    //     const bagsAreCheckedButtons = document.querySelectorAll('input[name="BagsChecked"]');
    //     for (const radioButton of bagsAreCheckedButtons) {
    //         if (radioButton.checked) {
    //             bagsAreChecked = radioButton.value;
    //             break;
    //         }
    //     }
    //     const returnRentalCarButtons = document.querySelectorAll('input[name="ReturnRentalCar"]');
    //     for (const radioButton of returnRentalCarButtons) {
    //         if (radioButton.checked) {
    //             returnRentalCar = radioButton.value;
    //             break;
    //         }
    //     }
    //     //Get requests for all of the appropriate APIs
    //     const options = {
    //         method: 'GET',
    //         url: 'https://airport-info.p.rapidapi.com/airport',
    //         params: { iata: "" + airplaneID },
    //         headers: {
    //             'X-RapidAPI-Key': '31b63c1f91msh03311155afd7261p1005d7jsn6c3149d1aa4b',
    //             'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
    //         }
    //     };
    //     const theUrl = 'https://www.tsawaittimes.com/api/airport/s79yMuRU0YPVmn2vuNtsVK9mU8krBA5d/' + airplaneID + '/JSON';
    //     const options1 = {
    //         method: 'GET',
    //         url: theUrl,
    //     };
    //     try {
    //         async function success(position) {
    //             const latitudeOrigin = position.coords.latitude;
    //             const longitudeOrigin = position.coords.longitude;
    //             const response = await axios.request(options);
    //             console.log(response.data);
    //             console.log(response.data.latitude);
    //             const latitudeDestination = response.data.latitude;
    //             const longitudeDestination = response.data.longitude;
    //             const URL = "https://maps.googleapis.com/maps/api/distancematrix/json?destinations=" + latitudeDestination + "%2C" + longitudeDestination + "&origins=" + latitudeOrigin + "%2C" + longitudeOrigin + "&key=AIzaSyBK3ScfWDHp9JiVX7KNHmJd4b1fs1--Uy4";
    //             const result = await axios.get(URL);
    //             console.log(result);
    //             const tripLength = parseInt(result.data.rows[0].elements[0].duration.value / 60);
    //             console.log(tripLength);
    //             realResponse = response;

    //             try {
    //                 const response1 = await axios.request(options1);
    //                 console.log(response1.data);
    //                 console.log(response1.data.rightnow);
    //                 //Logic for buffer algorithm
    //                 totalBuffer += tripLength;
    //                 if (precheck == "False" || response1.data.precheck == 0) {
    //                     totalBuffer += response1.data.rightnow;
    //                 }
    //                 if (international == "True") {
    //                     totalBuffer += 180;
    //                 }
    //                 else {
    //                     totalBuffer += 75;
    //                 }
    //                 if (bagsAreChecked = "True") {
    //                     totalBuffer += 15;
    //                 }
    //                 if (returnRentalCar = "True") {
    //                     totalBuffer += 30;
    //                 }
    //                 console.log(totalBuffer);
    //                 //How many days ago you will have to leave in order to reach your flight. Only for final output, should not be greater than 1.
    //                 console.log(timeControl.value);
    //                 var hours = (totalBuffer - totalBuffer % 60) / 60;
    //                 var arrivalHourNumber = parseInt(timeControl.value.substring(0, 2));
    //                 console.log(arrivalHourNumber);
    //                 if (timeControl.value.substring(5, 7) == "PM") {
    //                     arrivalHourNumber += 12
    //                 }
    //                 console.log(hours);
    //                 console.log(arrivalHourNumber);
    //                 console.log(response1.data.estimated_hourly_times[0].waittime);
    //                 if (arrivalHourNumber - hours > 0) {
    //                     for (var i = arrivalHourNumber; i > arrivalHourNumber - hours; i--) {
    //                         totalBuffer += parseInt(response1.data.estimated_hourly_times[i].waittime);
    //                     }
    //                 }
    //                 else {
    //                     for (var i = 24 - arrivalHourNumber; i > 24 - (arrivalHourNumber - hours); i--) {
    //                         totalBuffer += parseInt(response1.data.estimated_hourly_times[i].waittime);
    //                     }
    //                 }
    //                 console.log(totalBuffer);
    //                 var daysBehindOriginalForLeaving = 0;
    //                 var daysBehindOriginalForBeingAtAirport = 0;
    //                 var leaveTime = 0;
    //                 var timeToBeAtAirport = 0;
    //                 console.log(timeControl.value.substring(0, 2));
    //                 console.log(timeControl.value.substring(3, 5));
    //                 var departureTime = 0;
    //                 departureTime = (parseInt(timeControl.value.substring(0, 2)) * 60 + parseInt(timeControl.value.substring(3, 5)));
    //                 console.log(departureTime);
    //                 var timeAtAirportCalculated = false;
    //                 var leaveTimeCalculated = false;
    //                 if (departureTime - totalBuffer > 0 && !timeAtAirportCalculated) {
    //                     timeToBeAtAirport = departureTime - totalBuffer;
    //                     timeAtAirportCalculated = true;
    //                 }
    //                 else if (departureTime - totalBuffer < 0 && !timeAtAirportCalculated) {
    //                     timeToBeAtAirport = (departureTime - totalBuffer);
    //                     while (timeToBeAtAirport < 0) {
    //                         timeToBeAtAirport += 1440;
    //                         daysBehindOriginalForBeingAtAirport++;
    //                     }
    //                     timeAtAirportCalculated = true;
    //                 }
    //                 if (timeToBeAtAirport - tripLength > 0 && !leaveTimeCalculated) {
    //                     leaveTime = timeToBeAtAirport - tripLength;
    //                     leaveTimeCalculated = true;
    //                 }
    //                 else if (timeToBeAtAirport - tripLength < 0 && !leaveTimeCalculated) {
    //                     leaveTime = (timeToBeAtAirport - tripLength);
    //                     while (leaveTime < 0) {
    //                         leaveTime += 1440;
    //                         timeToBeAtAirport = (departureTime - totalBuffer);
    //                         daysBehindOriginalForLeaving++;
    //                     }
    //                     leaveTimeCalculated = true;
    //                 }
    //                 console.log(leaveTime);
    //                 if (timeToBeAtAirport < 0) {
    //                     timeToBeAtAirport += 1440;
    //                     daysBehindOriginalForLeaving++;
    //                 }
    //                 console.log(timeToBeAtAirport);
    //                 var leaveMinute = (leaveTime + timeToBeAtAirport) % 60;
    //                 var leaveHour = (leaveTime + timeToBeAtAirport - leaveMinute) / 60;
    //                 var timeFromAirportToGate = leaveTime - tripLength;
    //                 var airportToGateHours = 0;
    //                 var airportToGateMinutes = 0;
    //                 var airportToGateStatement = "";
    //                 if (timeToBeAtAirport - timeFromAirportToGate < 0) {
    //                     for (var i = 0; i <= parseInt((timeToBeAtAirport) / 1440); i++) {
    //                         daysBehindOriginalForBeingAtAirport++;
    //                     }
    //                     airportToGateMinutes = (timeFromAirportToGate - timeToBeAtAirport) % 60;
    //                     airportToGateHours = (timeFromAirportToGate - timeToBeAtAirport - airportToGateMinutes - daysBehindOriginalForBeingAtAirport * 1440) % 60;
    //                     if (daysBehindOriginalForBeingAtAirport > 1) {
    //                         airportToGateStatement = "You should leave the airport by " + airportToGateHours + ":" + airportToGateMinutes + " " + (daysBehindOriginalForBeingAtAirport) + " days before your flight.";
    //                     }
    //                     else if (daysBehindOriginalForBeingAtAirport == 1) {
    //                         airportToGateStatement = "You should leave the airport by " + airportToGateHours + ":" + airportToGateMinutes + " the day before your flight.";
    //                     }
    //                     else if (daysBehindOriginalForBeingAtAirport == 0) {
    //                         airportToGateStatement = "You leave the airport by " + airportToGateHours + ":" + airportToGateMinutes + " the day of your flight.";
    //                     }
    //                 }
    //                 else {
    //                     airportToGateMinutes = (timeToBeAtAirport - timeFromAirportToGate) % 60;
    //                     airportToGateHours = (timeToBeAtAirport - timeFromAirportToGate - airportToGateMinutes) % 60;
    //                     airportToGateStatement = "You should leave the airport by " + airportToGateHours + ":" + airportToGateMinutes + " the day of your flight";
    //                 }
    //                 if (daysBehindOriginalForLeaving == 1) {
    //                     console.log("You should be at the airport " + leaveHour + ":" + leaveMinute + " the day before your flight");
    //                     console.log(airportToGateStatement);
    //                 }
    //                 else if (daysBehindOriginalForLeaving > 1) {
    //                     console.log("You should be at the airport " + leaveHour + ":" + leaveMinute + " " + (daysBehindOriginalForLeaving) + " days before your flight");
    //                     console.log(airportToGateStatement);
    //                 }
    //                 else {
    //                     console.log("You should be at the airport " + leaveHour + ":" + leaveMinute + " the day of your flight");
    //                     console.log(airportToGateStatement);
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         }

    //         function error() {
    //             console.log("Unable to retrieve your location");
    //         }
    //         if (!navigator.geolocation) {
    //             console.log("Geolocation is not supported by your browser");
    //         } else {
    //             console.log("Locating…");
    //             navigator.geolocation.getCurrentPosition(success, error);
    //         }
    //     } catch (error) {
    //         if (typeof error != undefined) {
    //             console.error(error);
    //         }
    //     }
    // });

    const IATACode = useSelector(state => state.form.IATACode)
    const TSAPreCheck = useSelector(state => state.form.TSAPreCheck)
    const InternationalFlight = useSelector(state => state.form.InternationalFlight)
    const BagsChecked = useSelector(state => state.form.BagsChecked)
    const RentalCar = useSelector(state => state.form.RentalCar)
    const FlightTime = useSelector(state => state.form.FlightTime)
    const airportToGateStatement = useSelector(state => state.form.airportToGateStatement)


    const buttonClick = () => {
        {
            airplaneID = IATACode
            timeControl = document.querySelector('input[type="time"]');
            console.log(">>>>>>", (FlightTime))
            const precheck = TSAPreCheck
            const international = InternationalFlight
            bagsAreChecked = BagsChecked
            returnRentalCar = RentalCar
            //Get requests for all of the appropriate APIs
            const options = {
                method: 'GET',
                url: 'https://airport-info.p.rapidapi.com/airport',
                params: { iata: "" + airplaneID },
                headers: {
                    'X-RapidAPI-Key': '31b63c1f91msh03311155afd7261p1005d7jsn6c3149d1aa4b',
                    'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
                }
            };
            const theUrl = 'https://www.tsawaittimes.com/api/airport/yFlVNE9ZT5N3G0yZBEjQriAL0bxyrWZb/' + airplaneID + '/JSON';
            const options1 = {
                method: 'GET',
                url: theUrl,
            };
            try {
                async function success(position) {
                    const latitudeOrigin = position.coords.latitude;
                    const longitudeOrigin = position.coords.longitude;
                    const response = await axios.request(options);
                    console.log(response.data);
                    console.log(response.data.latitude);
                    const latitudeDestination = response.data.latitude;
                    const longitudeDestination = response.data.longitude;
                    const URL = "https://maps.googleapis.com/maps/api/distancematrix/json?destinations=" + latitudeDestination + "%2C" + longitudeDestination + "&origins=" + latitudeOrigin + "%2C" + longitudeOrigin + "&key=AIzaSyBK3ScfWDHp9JiVX7KNHmJd4b1fs1--Uy4";
                    const result = await axios.get(URL);
                    console.log(result);
                    const tripLength = parseInt(result.data.rows[0].elements[0].duration.value / 60);
                    console.log(tripLength);
                    realResponse = response;

                    try {
                        const response1 = await axios.request(options1);
                        console.log(response1.data);
                        console.log(response1.data.rightnow);
                        //Logic for buffer algorithm
                        totalBuffer += tripLength;
                        if (precheck == "False" || response1.data.precheck == 0) {
                            totalBuffer += response1.data.rightnow;
                        }
                        if (international == "True") {
                            totalBuffer += 180;
                        }
                        else {
                            totalBuffer += 75;
                        }
                        if (bagsAreChecked = "True") {
                            totalBuffer += 15;
                        }
                        if (returnRentalCar = "True") {
                            totalBuffer += 30;
                        }
                        console.log(totalBuffer);
                        //How many days ago you will have to leave in order to reach your flight. Only for final output, should not be greater than 1.
                        console.log(FlightTime);
                        var hours = (totalBuffer - totalBuffer % 60) / 60;
                        var arrivalHourNumber = parseInt(FlightTime.substring(0, 2));
                        console.log(arrivalHourNumber);
                        if (FlightTime.substring(5, 7) == "PM") {
                            arrivalHourNumber += 12
                        }
                        console.log(hours);
                        console.log(arrivalHourNumber);
                        console.log(response1.data.estimated_hourly_times[0].waittime);
                        if (arrivalHourNumber - hours > 0) {
                            for (var i = arrivalHourNumber; i > arrivalHourNumber - hours; i--) {
                                totalBuffer += parseInt(response1.data.estimated_hourly_times[i].waittime);
                            }
                        }
                        else {
                            for (var i = 24 - arrivalHourNumber; i > 24 - (arrivalHourNumber - hours); i--) {
                                totalBuffer += parseInt(response1.data.estimated_hourly_times[i].waittime);
                            }
                        }
                        console.log(totalBuffer);
                        var daysBehindOriginalForLeaving = 0;
                        var daysBehindOriginalForBeingAtAirport = 0;
                        var leaveTime = 0;
                        var timeToBeAtAirport = 0;
                        console.log(FlightTime.substring(0, 2));
                        console.log("test", FlightTime.substring(3, 5));
                        var departureTime = 0;
                        departureTime = (parseInt(FlightTime.substring(0, 2)) * 60 + parseInt(FlightTime.substring(3, 5)));
                        console.log(departureTime);
                        var timeAtAirportCalculated = false;
                        var leaveTimeCalculated = false;
                        if (departureTime - totalBuffer > 0 && !timeAtAirportCalculated) {
                            timeToBeAtAirport = departureTime - totalBuffer;
                            timeAtAirportCalculated = true;
                        }
                        else if (departureTime - totalBuffer < 0 && !timeAtAirportCalculated) {
                            timeToBeAtAirport = (departureTime - totalBuffer);
                            while (timeToBeAtAirport < 0) {
                                timeToBeAtAirport += 1440;
                                daysBehindOriginalForBeingAtAirport++;
                            }
                            timeAtAirportCalculated = true;
                        }
                        if (timeToBeAtAirport - tripLength > 0 && !leaveTimeCalculated) {
                            leaveTime = timeToBeAtAirport - tripLength;
                            leaveTimeCalculated = true;
                        }
                        else if (timeToBeAtAirport - tripLength < 0 && !leaveTimeCalculated) {
                            leaveTime = (timeToBeAtAirport - tripLength);
                            while (leaveTime < 0) {
                                leaveTime += 1440;
                                timeToBeAtAirport = (departureTime - totalBuffer);
                                daysBehindOriginalForLeaving++;
                            }
                            leaveTimeCalculated = true;
                        }
                        console.log(leaveTime);
                        if (timeToBeAtAirport < 0) {
                            timeToBeAtAirport += 1440;
                            daysBehindOriginalForLeaving++;
                        }
                        console.log(timeToBeAtAirport);
                        var leaveMinute = (leaveTime + timeToBeAtAirport) % 60;
                        var leaveHour = (leaveTime + timeToBeAtAirport - leaveMinute) / 60;
                        while(leaveHour > 23){
                            leaveHour = leaveHour-24;
                            daysBehindOriginalForLeaving++;
                        }
                        var timeFromAirportToGate = leaveTime - tripLength;
                        var airportToGateHours = 0;
                        var airportToGateMinutes = 0;
                        var airportToGateStatement = "";
                        if (timeToBeAtAirport - timeFromAirportToGate < 0) {
                            for (var i = 0; i <= parseInt((timeToBeAtAirport) / 1440); i++) {
                                daysBehindOriginalForBeingAtAirport++;
                            }
                            airportToGateMinutes = (timeFromAirportToGate - timeToBeAtAirport) % 60;
                            airportToGateHours = (timeFromAirportToGate - timeToBeAtAirport - airportToGateMinutes - daysBehindOriginalForBeingAtAirport * 1440) % 60;
                            if (daysBehindOriginalForBeingAtAirport > 1) {
                                airportToGateStatement = "You should leave for your gate by " + airportToGateHours + ":" + airportToGateMinutes + " " + (daysBehindOriginalForBeingAtAirport) + " days before your flight.";
                                console.log(airportToGateStatement);
                                dispatch(setAirportToGateStatement(airportToGateStatement))
                            }
                            else if (daysBehindOriginalForBeingAtAirport == 1) {
                                airportToGateStatement = "You should leave for your gate by " + airportToGateHours + ":" + airportToGateMinutes + " the day before your flight.";
                                console.log(airportToGateStatement);
                                dispatch(setAirportToGateStatement(airportToGateStatement))
                            }
                            else if (daysBehindOriginalForBeingAtAirport == 0) {
                                airportToGateStatement = "You should leave for your gate by " + airportToGateHours + ":" + airportToGateMinutes + " the day of your flight.";
                                console.log(airportToGateStatement);
                                dispatch(setAirportToGateStatement(airportToGateStatement))
                            }
                        }
                        else {
                            airportToGateMinutes = (timeToBeAtAirport - timeFromAirportToGate) % 60;
                            airportToGateHours = (timeToBeAtAirport - timeFromAirportToGate - airportToGateMinutes) % 60;
                            airportToGateStatement = "You should leave for the airport by " + airportToGateHours + ":" + airportToGateMinutes + " the day of your flight";
                            console.log(airportToGateStatement);
                            dispatch(setHomeToAirportStatement(airportToGateStatement))
                        }
                        console.log(airportToGateStatement);
                        if (daysBehindOriginalForLeaving == 1) {
                            airportToGateStatement = ("You should leave for the airport by " + leaveHour + ":" + leaveMinute + " the day before your flight");
                            console.log(airportToGateStatement);
                            dispatch(setHomeToAirportStatement(airportToGateStatement))
                        }
                        else if (daysBehindOriginalForLeaving > 1) {
                            airportToGateStatement = ("You should leave for the airport by " + leaveHour + ":" + leaveMinute + " " + (daysBehindOriginalForLeaving) + " days before your flight");
                            console.log(airportToGateStatement);
                            dispatch(setHomeToAirportStatement(airportToGateStatement))
                        }
                        else {
                            airportToGateStatement = ("You should leave for the airport by " + leaveHour + ":" + leaveMinute + " the day of your flight");
                            console.log(airportToGateStatement);
                            dispatch(setHomeToAirportStatement(airportToGateStatement))
                        }
                        dispatch(setShowTimeline(true))
                    } catch (error) {
                        console.error(error);
                    }
                }

                function error() {
                    console.log("Unable to retrieve your location");
                }
                if (!navigator.geolocation) {
                    console.log("Geolocation is not supported by your browser");
                } else {
                    console.log("Locating…");
                    navigator.geolocation.getCurrentPosition(success, error);
                }
            } catch (error) {
                if (typeof error != undefined) {
                    console.error(error);
                }
            }
        }


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
                    <p>What is the time of your flight?</p>
                    <input className="w-100 mb-2 border-0" type="time" id="appt" name="appt" onChange={e => dispatch(setFlightTime(e.target.value))} />
                    {/* <button type="button" id = "clickButton" onClick={buttonClick}>Get your timeline now!</button> */}
                    <Button variant="primary" type="button" id="clickButton" onClick={buttonClick}>Get your timeline now!</Button>
                    <label>{airportToGateStatement}</label>
                    <VerticalTimelineComp />
                </div>


            </div>
        </div>

    )
}
export default Main