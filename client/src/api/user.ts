import type { createUser, LoginFormData } from "@/types/auth";
import axios from "axios";
import axiosInstance from "./axiosInstance";

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export async function signup(data: createUser) {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Signup failed"));
  }
}

export async function login(data: LoginFormData) {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Login failed"));
  }
}