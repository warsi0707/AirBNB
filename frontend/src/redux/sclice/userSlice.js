import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BackendUrl } from "../../helper";
import toast from "react-hot-toast";


export const userSignin =  createAsyncThunk('user/signin', async({username, password}, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        const result = await response.json()
        if(response.status == 200){
            toast.success(result.message)
            localStorage.setItem('token', result.token)
            localStorage.setItem('user', JSON.stringify(result.user))
            return result
        }else{
            toast.error(result.error)
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error.message)
    }
})

const userAuthScliece = createSlice({
    name: 'userAuth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user'))|| null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated: false,
        token: localStorage.getItem('token') || null
    },
    reducers:{
        userAuthVerify: (state, action)=>{
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))
            if(token && token.length > 0){
                state.isAuthenticated = true;
                state.token = localStorage.getItem('token') || null;
                state.user = user
            }            
        },
        userLogOut : (state)=>{
            const token = localStorage.getItem('token')
            if(token && token.length >0){
                toast.success("Log out")
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                state.user = null,
                state.isAuthenticated = false,
                state.token = null
            }
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(userSignin.fulfilled, (state, action)=>{
            state.user = action.payload.user,
            state.loading = false,
            state.error = null,
            state.success = true,
            state.isAuthenticated = true,
            state.token = action.payload.token
        })
        .addCase(userSignin.pending, (state)=>{
            state.loading = true
        })
        .addCase(userSignin.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.payload,
            state.success = false,
            state.isAuthenticated = false,
            state.token = null
        })
    }
})

export const {userAuthVerify,userLogOut} = userAuthScliece.actions;
const userAuthReducer = userAuthScliece.reducer;
export default userAuthReducer;