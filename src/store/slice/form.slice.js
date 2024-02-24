import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    TSAPreCheck: false,
    InternationalFlight: false,
    BagsChecked: false,
    RentalCar: false,
    rideShare: false,
    FlightTime: "",
    IATACode: '',
    airportToGateStatement: '',
    beAtAirportStatement: "",
    homeToAirportStatement: '',
    showTimeline: false,
    latitudeDestination: '',
    longitudeDestination: '',
    latitudeOrigin: '',
    longitudeOrigin: '',
    particularHourWaitTime: '',
    googleDistanceMatrix: '',
    distanceMatrix: '',
    totalBuffer: 0,
    leaveFromHome: 0,
    reachAirportBy: 0,
    finalData: ''




}



function convertTo12HrFormat(time) {
    let [hours, minutes] = time.split(":");
    let period = +hours < 12 ? 'AM' : 'PM';
    hours = +hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
}

function addMinutes(time, minutesToAdd) {

    // Split the time into hours and minutes
    let [hours, minutes] = time.split(":");

    // Convert minutesToAdd to a number
    minutesToAdd = Number(minutesToAdd);

    // Create a new Date object
    let date = new Date();

    // Set the hours and minutes
    date.setHours(hours);
    date.setMinutes(minutes);

    // Add the minutes
    date.setMinutes(date.getMinutes() + minutesToAdd);

    // Format the time in HH:MM format
    let newTime = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    return newTime;
}



function subtractHours(time, hoursToSubtract) {
    // Split the time into hours and minutes
    let [hours, minutes] = time.split(":");

    // Create a new Date object
    let date = new Date();

    // Set the hours and minutes
    date.setHours(hours);
    date.setMinutes(minutes);

    // Subtract the hours
    date.setHours(date.getHours() - hoursToSubtract);

    // Format the time in HH:MM format
    let newTime = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    return newTime;
}

console.log(subtractHours("18:00", 4)); // This will output "14:00"

function filterByHour(data, time) {
    let hour = parseInt(time.split(':')[0]);
    for (let i = 0; i < data.estimated_hourly_times.length; i++) {
        let item = data.estimated_hourly_times[i];
        if (item.hour && item.hour === hour) {
            return item;
        }
    }
    return null;
}
export const fetchAirportInfo = createAsyncThunk(
    'airports/fetchAirportInfo',
    async (thunkAPI, { getState, dispatch }) => {

        const state = getState()
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://airport-info.p.rapidapi.com/airport',
                params: { iata: "" + state.form.IATACode },
                headers: {
                    'X-RapidAPI-Key': '31b63c1f91msh03311155afd7261p1005d7jsn6c3149d1aa4b',
                    'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
                }
            });
            dispatch(fetchAirportWaitTimes())
            dispatch(fetchGoogleDistanceMatrix())
            dispatch(fetchDistanceMatrix({ lat: response.data.latitude, long: response.data.longitude }))
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchAirportWaitTimes = createAsyncThunk(
    'airports/fetchAirportWaitTimes',
    async (thunkAPI, { getState }) => {

        const state = getState()
        try {
            const theUrl = 'https://www.tsawaittimes.com/api/airport/yFlVNE9ZT5N3G0yZBEjQriAL0bxyrWZb/' + state.form.IATACode + '/JSON';
            const response = await axios({
                method: 'GET',
                url: theUrl,
            });

            response.filterData = filterByHour(response.data, state.form.FlightTime)
            response.rightnow = response.data.rightnow
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);


export const fetchGoogleDistanceMatrix = createAsyncThunk(
    'distances/fetchGoogleDistanceMatrix',

    async ({ latitudeOrigin, longitudeOrigin, latitudeDestination, longitudeDestination }, thunkAPI, { getState }) => {


        const state = getState()

        try {
            const URL = "https://maps.googleapis.com/maps/api/distancematrix/json?destinations=" + state.form.latitudeDestination + "%2C" + state.form.longitudeDestination + "&origins=" + state.form.latitudeOrigin + "%2C" + state.form.longitudeOrigin + "&key=AIzaSyBK3ScfWDHp9JiVX7KNHmJd4b1fs1--Uy4";
            const response = await axios.get(URL);
            if (response.data.status === "OK")
                return response.data.rows[0].elements[0].duration;
            else
                return thunkAPI.rejectWithValue(response.data.status)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);


export const fetchDistanceMatrix = createAsyncThunk(
    'distances/fetchDistanceMatrix',
    async ({ orLat, orLong, lat, long }, thunkAPI) => {


        try {
            const testUrl = "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=" + "40.7427990" + "%2C" + "-74.1784187" + "&destinations=" + lat + "%2C" + long + "&key=UzwgOy0n3NZkVLbRwLWzoxOwfF5O2i9g8LL2OFnuLxheT7FPXI1I1QHoVu9N3lhl";
            const response = await axios.get(testUrl);
            if (response.data.status === "OK")
                return response.data.rows[0].elements[0].duration;
            else
                return thunkAPI.rejectWithValue(response.data.status)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

const formSlice = createSlice({
    name: 'allInputs',
    initialState,
    reducers: {
        setTSAPreCheck(state, action) {
            state.TSAPreCheck = action.payload;
        },
        setInternationalFlight(state, action) {
            state.InternationalFlight = action.payload;


        },
        setBagsChecked(state, action) {
            state.BagsChecked = action.payload;

        },
        setRentalCar(state, action) {
            state.RentalCar = action.payload;

        },
        setFlightTime(state, action) {
            state.FlightTime = action.payload;
        },
        setIATACode(state, action) {
            state.IATACode = action.payload
        },
        setAirportToGateStatement(state, action) {
            state.airportToGateStatement = action.payload
        },
        setBeAtAirportStatement(state, action) {
            state.beAtAirportStatement = action.payload
        },
        setHomeToAirportStatement(state, action) {
            state.homeToAirportStatement = action.payload
        },
        setOriginLong(state, action) { state.longitudeOrigin = action.payload },
        setOriginLat(state, action) { state.latitudeOrigin = action.payload },
        setShowTimeline(state, action) { state.showTimeline = action.payload },
        setRideShare(state, action) {
            state.rideShare = action.payload
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchAirportInfo.fulfilled, (state, action) => {
                state.longitudeDestination = action.payload.longitude
                state.latitudeDestination = action.payload.latitude


                if (state.InternationalFlight === true) {
                    state.totalBuffer += 90;
                }
                else if (state.InternationalFlight === false) {
                    state.totalBuffer += 0;
                }
                if (state.BagsChecked === true) {
                    state.totalBuffer += 15;
                }
                if (state.RentalCar === true) {
                    state.totalBuffer += 30;
                }
                // if (state.rideShare = true) {
                //     state.totalBuffer += 20;
                // }


            })
            .addCase(fetchAirportWaitTimes.fulfilled, (state, action) => {

                state.particularHourWaitTime = action.payload.filterData
                state.rightNowTSA = action.payload.rightnow
                // state.totalBuffer += action.payload.filterData.waittime
                if (state.TSAPreCheck === false || action.payload.data.precheck
                    === 0) state.totalBuffer += action.payload.rightnow
            })
            .addCase(fetchDistanceMatrix.fulfilled, (state, action) => {
                state.distanceMatrix = (action.payload.value / 60).toFixed(0)
                state.leaveFromHome = convertTo12HrFormat(subtractHours(state.FlightTime, ((state.totalBuffer) / 60)))
                state.reachAirportBy = convertTo12HrFormat(addMinutes(subtractHours(state.FlightTime, ((state.totalBuffer) / 60)), state.distanceMatrix))
                state.finalData = [
                    {
                        id: 1,
                        title: "Leave for the Airport",
                        description: `You should leave for the airport by ${state.leaveFromHome}`,
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
                        description: `You should reach Airport by ${state.reachAirportBy}`,
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
                        description: `Your flight time is ${convertTo12HrFormat(state.FlightTime)}`,
                        iconClassName: "ri-plane-fill",
                        source: false,
                        destination: true,

                    },
                ]



                if (state.InternationalFlight)
                    state.finalData.push({
                        id: 4,
                        title: "International Flight",
                        description: `It will take around 2Hrs`,
                        source: false,
                        destination: false,
                    });
                if (state.BagsChecked)
                    state.finalData.push({
                        id: 5,
                        title: "Bag Checks",
                        description: `It will take around 15mins`,
                        source: false,
                        destination: false,
                    });
                if (state.RentalCar)
                    state.finalData.push({
                        id: 6,
                        title: "Returning Rental Car",
                        description: `It will take around 30mins`,
                        source: false,
                        destination: false,
                    });



            })
            .addCase(fetchGoogleDistanceMatrix.fulfilled, (state, action) => (
                state.googleDistanceMatrix = action.payload))
    }
});

export const { setTSAPreCheck, setShowTimeline, setFlightTime, setRentalCar, setInternationalFlight, setBagsChecked, setIATACode, setAirportToGateStatement, setBeAtAirportStatement, setHomeToAirportStatement, setRideShare, setOriginLat, setOriginLong } = formSlice.actions;
export const formSliceReducer = formSlice.reducer;

