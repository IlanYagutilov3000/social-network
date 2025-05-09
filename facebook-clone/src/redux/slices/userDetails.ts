import { useEffect } from "react"
import { getUserById } from "../../services/userServices"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id?: string,
    firstname: string,
    lastname: string,
    birthday: number,
    gender: string,
    email: string,
    profilePicture: string
}

interface UserState {
    userDetails: User | null;
    loading: boolean;
}

const initialState: UserState = {
    userDetails: null,
    loading: false,
};

// Fetch user details
export const fetchUserDetails = createAsyncThunk(
    "user/fetchUserDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserById();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch user");
        }
    }
);

const userSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
                state.userDetails = action.payload;
            });
    },
});

export default userSlice.reducer;