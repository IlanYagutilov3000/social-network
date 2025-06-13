import axios from "axios";
import { Post } from "../interfaces/Post";


const api: string = `${process.env.REACT_APP_API}/post`

// get all posts + sorted
export const getAllPosts = (sortBy: "newest" | "oldest") => {
    return axios.get(`${api}?sort=${sortBy}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } });
};

// get post by id
export function getPostById(postId: string) {
    return axios.get(`${api}/${postId}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
}

// creating new post
export function createPost(post: Post) {
    return axios.post(api, post, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
};


// need to figure this one out and make it simpler
export function updatePost(post: Post & { _id: string }) {
    const { _id, ...postWithoutId } = post; 
    return axios.put(`${api}/${_id}`, postWithoutId, {
        headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) }
    });
}

// get all posts that belong to the user
export function getAllPostsOfTheUser(userId: string) {
    return axios.get(`${api}/my-posts/${userId}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
};

// liks posts or unlike them
export function likeAndUnlikePosts(postId: string) {
    return axios.patch(`${api}/${postId}`, {}, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
}

//delete post
export function deletePost(postId: string) {
    return axios.delete(`${api}/${postId}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
}