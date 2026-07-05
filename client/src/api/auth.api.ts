import { apiClient } from "./apiClient";
import type { LoginFormData, SignupFormData } from "@/types/auth";

export const signup = async (data: Omit<SignupFormData, "confirmPassword">) => {
  const response = await apiClient.post("/auth/signup", data);
  return response.data;
};

export const signin = async (data: LoginFormData) => {
  const response = await apiClient.post("/auth/signin", data);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const logoutAll = async () => {
  const response = await apiClient.post("/auth/logout-all");
  return response.data;
};

export const refresh = async () => {
  const response = await apiClient.post("/auth/refresh");
  return response.data;
};
