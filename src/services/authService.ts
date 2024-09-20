/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/instance/axiosInstance"
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";


export const loginUser = async (loginData: FieldValues) => {
  try {

    const { data } = await axiosInstance.post('/auth/sign-in', loginData);
    console.log(data);
    if (data?.success) {
      localStorage.setItem('token', data?.data?.accessToken);
      return data;
    } else {
      throw new Error(data?.message || "Login failed");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Something went wrong");
  }
}


export const getCurrentUser = async () => {

  const token = localStorage.getItem('token');
  let decodedToken = null;
  if (token) {
    decodedToken = await jwtDecode(token);
  }

  return decodedToken;
}


export const logoutUser = () => {
  localStorage.removeItem('token');
  return;
}