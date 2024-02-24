import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    TSAPreCheck: false,
    InternationalFlight: false,
    BagsChecked: false,
    RentalCar: false,
    rideShare:false,
    FlightTime: "",
    IATACode: '',
    airportToGateStatement: '',
    beAtAirportStatement:"",
    homeToAirportStatement:'',
    showTimeline:false,
   

}



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
    setShowTimeline(state,action){state.showTimeline=action.payload},
    setRideShare(state,action){
        state.rideShare=action.payload
    }

    },
});

export const { setTSAPreCheck,setShowTimeline, setFlightTime, setRentalCar, setInternationalFlight, setBagsChecked, setIATACode, setAirportToGateStatement, setBeAtAirportStatement, setHomeToAirportStatement, setRideShare } = formSlice.actions;
export const formSliceReducer = formSlice.reducer;

