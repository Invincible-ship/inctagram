import axios from "axios";

export const AuthInstance = axios.create({
  baseURL: 'https://inctagram-api.fly.dev' + "auth/",
  withCredentials: true,
});
