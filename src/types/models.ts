import mongoose from "mongoose";
  
export interface IPost {
    _id?: string;
    title: string;
    content: string;
    userId: string;
}
  
export interface IComment {
    _id?: string;
    postId: mongoose.Schema.Types.ObjectId;
    content: string;
    userId: string;
}