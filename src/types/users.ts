export interface IUser {
  _id: string;
  name: string;
  email: string;
  accessToken: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  credential: IUser;
}
