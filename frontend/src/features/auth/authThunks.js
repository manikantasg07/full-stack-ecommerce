import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "./utils";
import { toast } from "react-toastify";


export const registerUserThunk = createAsyncThunk("Auth/register",async(userData,thunkAPI)=>{
    
    try {
        const data = await register(userData);
        toast.success("User successfully signed it");
        thunkAPI.fulfillWithValue(data);
    } catch (error) {
        console.error(error);
        toast.error(error.message);
        thunkAPI.rejectWithValue(error.message);
    }


})