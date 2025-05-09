import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
    _id: string;
    userId: string;
    text: string;
    image?: string;
    likes: string[];
    comments: string[];
    cretaedAt: string;
}

interface postState { 
    posts: Post[];
}

const initialState: postState = {
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        // Replaces the entire posts array with new posts from action.payload. Used when fetching posts from a backend.
        setPosts: (state, action: PayloadAction<Post[]>) =>{
            state.posts = action.payload
        },
        // Inserts a new post at the beginning (unshift adds to the start).Keeps the most recent posts at the top.
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.unshift(action.payload)
        },

        deletePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter(post => post._id !== action.payload)
        },
        updatePost: (state, action: PayloadAction<Post>) => {
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        }
    }
})

export const { setPosts, addPost, deletePost, updatePost } = postSlice.actions
export default postSlice.reducer;