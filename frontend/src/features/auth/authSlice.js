import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk } from "./authThunks";


const initialState = {
    user : null,
    loading:false,
    error : false,
    errorMessage : false
}

const authSlice = createSlice({
    name :'Auth',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(registerUserThunk.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(registerUserThunk.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(registerUserThunk.rejected,(state,action)=>{
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload;
        })
    }
})

export default authSlice.reducer;

