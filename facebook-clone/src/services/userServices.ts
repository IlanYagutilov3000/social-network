import axios from "axios";
import { User, UserDetails, UserLogin } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`

// creatre user meaning signing in
export function registerUser(newUser: User) {
    return axios.post(`${api}/register`, newUser)
}

// login user
export function login(user: UserLogin) {
    return axios.post(`${api}/login`, user)
}

// get current user
// there is auth validation here that's why header is here
export function getUserById() {
    return axios.get(api, {
        headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) }
    })
}

// get other users details
export function getFriendsDetails(userId: string) {
    return axios.get(`${api}/${userId}`, {
        headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) }
    })
}

// update user
export function updateUSer(user: UserDetails) {
    return axios.put(`${api}/${user._id}`, user, {
        headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) }
    });
}

// delete user
export function deleteUSer(userId: string) {
    return axios.delete(`${api}/${userId}`, {
        headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) }
    })
}