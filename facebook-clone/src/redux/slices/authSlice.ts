import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// User interface
interface User {
    _id: string;
    isAdmin: boolean;
    // we need to add isOnline as well here later on
}

// Auth state interface
interface AuthState {
    user: User | null;
    token: string | null;
    isOnline: boolean
}

// Function to get the token safely
const getStoredToken = (): string | null => {
    try {
        return localStorage.getItem("token");
    } catch (error) {
        console.error("Error accessing localStorage:", error);
        return null;
    }
};

// Function to decode the token safely
const decodeToken = (token: string | null): User | null => {
    if (!token) return null;
    try {
        return jwtDecode<User>(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

// Read token from storage
const storedToken = getStoredToken();
const decodedUser = decodeToken(storedToken);

// Initial state
const initialState: AuthState = {
    user: decodedUser,
    token: storedToken,
    isOnline: decodedUser ? true : false
};

// Redux slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ token: string }>) => {
            const { token } = action.payload;
            const decoded = decodeToken(token);
            if (decoded) {
                state.user = decoded;
                state.token = token;
                state.isOnline = true
                localStorage.setItem("token", JSON.stringify(token));
            }
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isOnline = false
            localStorage.removeItem("token");
        }
    }
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;