import  { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface ILikeVideo{
  id: number,
  _count: {
    likevideos: number
  }
}

export enum TYPEUSER {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export interface IFollow{
  followingId: number
}

export interface IUser {
  _id: string;
}

export interface MyToken {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  typeuser: TYPEUSER;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICustomRequest extends Request {
  token: string | JwtPayload;
}

export interface IToken{
  _id: number
}

export interface IVideo {
  title: string;
  published: boolean;
  url: string;
  description: string;
  creatorId: number;
}

export interface IPublishUnpublish {
  creatorId: number;
  videoId: number;
}

export interface IFollower{
  followerId: number
}