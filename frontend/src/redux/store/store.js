import { configureStore } from '@reduxjs/toolkit';
import listingReducer from '../sclice/listingSlice';
import userAuthReducer from '../sclice/userSlice';


export const store = configureStore({
    reducer: {
        listing: listingReducer,
        userAuth: userAuthReducer
    }
})

export default store;