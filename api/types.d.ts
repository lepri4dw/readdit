import {Schema} from "mongoose";

export interface IUser {
  username: string;
  displayName: string;
  password: string;
  token: string;
}

export interface IPost {
  title: string;
  description: string;
  image: string | null;
  user: Schema.Types.ObjectId;
  datetime: Date;
}