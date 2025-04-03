import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/common/interfaces/IUser";
import api from "../../../api/request";

interface UserState {
    user: IUser | null;
    loading: boolean,
    error: string | null,
  }

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const responce = await api.post("/user", { email, password });
            console.log(responce.data+"RD");
            return responce.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
);
 const registerSlice =  createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = { id: action.payload.id, email: action.payload.email };
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
    }
 })

 export default registerSlice.reducer; 