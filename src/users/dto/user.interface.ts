import { Types } from 'mongoose';

export interface PublicUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
}

export interface FullUser extends PublicUser {
  password: string;
}
