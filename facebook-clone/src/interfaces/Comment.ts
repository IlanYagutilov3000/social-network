import { User } from "./User";

export interface Comment{
    _id?: string;
    userId?: string | User;
    postId?: string;
    text: string;
    createdAt?: string;
}