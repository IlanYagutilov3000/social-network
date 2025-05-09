import axios from "axios";
import { Comment } from "../interfaces/Comment";

const api: string = `${process.env.REACT_APP_API}/comment`
// I thin k we'll need to change a few of them from params to body
// the use of params with the backend functions are worng and the frontend as well


// get the comments from a specific post
export function getComments(postId: string){
    return axios.get(`${api}/${postId}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
};

// craete a comment
export function createComment(postId: string, comment: Comment){
    return axios.post(`${api}/${postId}`, comment, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
};

// delete a comment
export function deletComment(commentId: string){
    return axios.delete(`${api}/${commentId}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
}