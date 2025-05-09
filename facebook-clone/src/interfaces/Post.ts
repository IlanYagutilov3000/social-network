import { User } from "./User";

export interface Post{
    _id?: string;
    userId: string | User;
    text: string;
    image?: string;
    likes?: string[];
    comments?: string[];
    createdAt?: Date;
}
