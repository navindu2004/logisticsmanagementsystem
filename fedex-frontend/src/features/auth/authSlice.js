import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  token: token || null,
  status: null,
};

export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await API.post("/auth/login", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        localStorage.setItem("token", payload.token);
        state.status = "success";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "registered";
      })
      .addCase(loginUser.rejected, registerUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
