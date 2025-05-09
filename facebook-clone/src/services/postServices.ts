import axios from "axios";
import { Post } from "../interfaces/Post";


const api: string = `${process.env.REACT_APP_API}/post`
// I thin k we'll need to change a few of them from params to body
// the use of params with the backend functions are worng and the frontend as well

//get all posts
export function getAllPosts() {
    return axios.get(api, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
};

// get post by id
export function getPostById(postId: string) {
    return axios.get(`${api}/${postId}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
}

// creating new post
export function createPost(post: Post) {
    return axios.post(api, post, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
};

/* export function updatePost(post: Post){
    return axios.put(`${api}/${post._id}`, post, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
} */

// need to figure this one out and make it simpler
export function updatePost(post: Post & { _id: string }) {
    const { _id, ...postWithoutId } = post; // Remove _id from the body
    return axios.put(`${api}/${_id}`, postWithoutId, {
        headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) }
    });
}

// get all posts that belong to the user
// might change it from params to take it from the payload
export function getAllPostsOfTheUser(userId: string) {
    return axios.get(`${api}/my-posts/${userId}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
};

// liks posts or unlike them need to change it to patch and not put
export function likeAndUnlikePosts(postId: string) {
    return axios.patch(`${api}/${postId}`, {}, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
}

//delete post
export function deletePost(postId: string) {
    return axios.delete(`${api}/${postId}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string) } })
}