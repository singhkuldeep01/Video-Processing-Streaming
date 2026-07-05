import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const PublicRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    // Already logged in, redirect away from public pages (like /auth) to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
