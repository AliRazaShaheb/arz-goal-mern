import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authServiceRegister } from "./authService";
import type { PayloadAction } from '@reduxjs/toolkit'
import {userDataTypes} from '../../types/slices'

// get user from local storage
const localSt = typeof window !== "undefined" && localStorage.getItem("user");
const user = JSON.parse(localSt || "null");

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};



export const register = createAsyncThunk(
  "auth/register",
  async (user:userDataTypes, thunkAPI) => {
    try {
      console.log(user)
      return await authServiceRegister(user);
    } catch (err: any) {
      const message =
        (err.response && err.respnse.data && err.response.data.message) ||
        err.message || err;
        return thunkAPI.rejectWithValue(message)
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) =>{
      console.log(action.payload)
       state.isLoading = false;
       state.isSuccess = true;
       state.user  = action.payload;
    })
    .addCase(register.rejected, (state, action)=>{
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload as string
    })
  },
});

export default authSlice.reducer;

export const { reset } = authSlice.actions;
