import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BackendUrl } from "../../helper";
import toast from "react-hot-toast";

export const fetchListing = createAsyncThunk('fetch/listing', async(_, {rejectWithValue})=>{
    try {
        const response = await fetch(`${BackendUrl}/listings`)
        const result = await response.json()
        if(response.status == 200){
            return result.listings
        } else {
            return rejectWithValue("Failed to fetch")
        }
    }catch (error){
        toast.error("Failed to fetch")
        return rejectWithValue(error.message)
    }
})
export const fetchlistingByid = createAsyncThunk("fetch/listingById", async(id, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/listings/${id}`)
        const result = await response.json()
        if(response.status ==200){
            return result.listing
        }else{
            return rejectWithValue("Failed to fetch")
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const getReviews = createAsyncThunk("fetch/review", async(payload, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/rate/${payload}`)
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error.message)
    }
})
export const postReview = createAsyncThunk("fetc/postReview", async(payload, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/rate/${payload.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                token: localStorage.getItem('token')
            },
            body: JSON.stringify({id:payload.id, rate:payload.rate, comment:payload.comment})
        })
        const result = await response.json()
        if(response.status == 200){
            toast.success(result.message)
            return result
        }else{
            toast.error(result.error)
            return rejectWithValue(result.error)
        }
    }catch(error){
        toast.error("failed")
        return rejectWithValue(error)
    }
})
export const deleteReview = createAsyncThunk("fetch/removeReview",async(payload, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/rate/${payload.id}/${payload.reviewId}`,{
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        const result = await response.json()
        if(response.status == 200){
            toast.success(result.message)
            return result
        }else{
            toast.error(result.error)
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const booking = createAsyncThunk('fetch/listingBooking', async(payload, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/booking/${payload.id}`,{
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({checkIn:payload.checkIn, checkOut:payload.checkOut, totalPrice:payload.totalPrice,guests:payload.guests, firstName:payload.firstName, lastName:payload.lastName, phone:payload.phone, email:payload.email})
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.message)
            return result
        }else{
            toast.error(result.error)
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const getBookings =createAsyncThunk('fetch/getingBooking', async(_,{rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/booking`,{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        const result =await response.json()
        if(response.status == 200){
            return result
        }else{
            return rejectWithValue
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const fetchCancelBooking = createAsyncThunk('fetch/cancelBooking', async(payload, {rejectWithValue})=>{
})
export const fetchSearchListing = createAsyncThunk("fetch/searchListing", async(payload, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/listings/search?query=${payload}`)
        const result = await response.json()
        if(response.status == 200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})


const listingSlcie = createSlice({
    name: 'listing',
    initialState: {
        listing: [],
        detailedListing: {},
        loading: false,
        error: null,
        success: false,
        reviews: [],
        savedListing: JSON.parse(localStorage.getItem('saved')) || [],
        bookings: []
    },
    reducers:{
        saveListing : (state, action)=>{
            let savedItem = JSON.parse(localStorage.getItem('saved'))
            if(!Array.isArray(savedItem)){
                savedItem = []
            }
            if(savedItem.find((listing)=> listing._id === action.payload._id)){
                toast.error("Alrady saved")
                return;
            }
            savedItem.push(action.payload)
            state.savedListing = [...state.savedListing, action.payload]
            toast.success("Listing saved")
           localStorage.setItem('saved', JSON.stringify(savedItem))
        },
        unsaveListing : (state, action)=>{
            let savedItem = JSON.parse(localStorage.getItem('saved'))
            if(!Array.isArray(savedItem)){
                savedItem = []
            }
            let updatedListing =savedItem.filter((listing)=> listing._id !== action.payload)
            toast.success("Listing Unsaved")
            localStorage.setItem('saved', JSON.stringify(updatedListing))
            state.savedListing = updatedListing
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchListing.fulfilled, (state, action)=>{
            state.listing = action.payload,
            state.loading = false,
            state.error = null,
            state.success = true
        })
        .addCase(fetchListing.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchListing.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.payload,
            state.success = false
        })
        .addCase(fetchlistingByid.fulfilled, (state, action)=>{
            state.detailedListing = action.payload,
            state.loading = false,
            state.error = null,
            state.success = true
        })
        .addCase(fetchlistingByid.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchlistingByid.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.payload,
            state.success = false
        })
        .addCase(getReviews.fulfilled, (state, action)=>{
            state.loading = false
            state.reviews = action.payload.reviews
        })
        .addCase(getReviews.rejected, (state, action)=>{
            state.error = action.payload
            state.success = false
        })
        .addCase(postReview.fulfilled, (state, action)=>{
            state.loading = false,
            state.error = null,
            state.reviews = action.payload.reviews;
        })
        .addCase(postReview.rejected, (state,action)=>{
            state.error = action.payload
        })
        .addCase(deleteReview.fulfilled, (state, action)=>{
            state.loading = false,
            state.error = null,
            state.success = true,
            state.reviews = state.reviews.filter((item)=> item._id !==action.payload.deltedReviewId)
        })
        .addCase(deleteReview.pending, (state)=>{
            state.loading = true
        })
        .addCase(deleteReview.rejected, (state, action)=>{
            state.loading = false,
            state.success = false,
            state.error = action.payload.error
        })
        .addCase(booking.pending, (state)=>{
            state.loading = true
        })
        .addCase(booking.rejected, (state, payload)=>{
            state.error  = true,
            state.success = false
        })
        .addCase(booking.fulfilled, (state, action)=>{
            state.loading = false,
            state.error = false,
            state.success = true
        })
        .addCase(getBookings.pending, (state)=>{
            state.loading = true
        })
        .addCase(getBookings.rejected, (state, action)=>{
            state.loading = false,
            state.error = true
        })
        .addCase(getBookings.fulfilled, (state, action)=>{
            state.loading = false,
            state.error = false,
            state.bookings = action.payload
        })
        .addCase(fetchCancelBooking.pending, async(state)=>{
            state.loading = true
        })
        .addCase(fetchCancelBooking.fulfilled, (state, action)=>{
            state.loading = false
            state.error = false
        })
        .addCase(fetchCancelBooking.rejected, (state, action)=>{
            state.loading = false
            state.error = true
        })
        .addCase(fetchSearchListing.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchSearchListing.fulfilled, (state, action)=>{
            state.loading = false
            state.listing = action.payload.listing
        })
        .addCase(fetchSearchListing.rejected, (state, action)=>{
            state.loading = false
        })
    }
})

const listingReducer = listingSlcie.reducer;
export const  {saveListing, unsaveListing} = listingSlcie.actions;
export default listingReducer;