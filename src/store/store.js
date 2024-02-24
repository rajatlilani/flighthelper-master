import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, Action, ThunkAction, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import { formSliceReducer } from './slice/form.slice'


// const middleware = [...getDefaultMiddleware(), logger];
const store = configureStore({
    reducer: {
        form: formSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export const useAppSelector = useSelector


export const AppDispatch = store.dispatch
export const useAppDispatch = () => useDispatch()


export default store;