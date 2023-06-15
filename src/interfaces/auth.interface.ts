import { Types } from 'mongoose';

export interface IAuthUser {
  token?: string;
  email?: string;
  phone: string;
  fullname?: string;
  isPhoneNumberConfirmed?: boolean;
  type?: number;
  role?: string;
  id?: Types.ObjectId;
}
