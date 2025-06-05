import axios from "axios";
import { Comment } from "../interfaces/Comment";

const api: string = `${process.env.REACT_APP_API}/comment`

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