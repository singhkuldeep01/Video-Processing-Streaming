import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { refresh } from "@/api/auth.api";
import { authChannel } from "@/utils/auth-channel";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth.api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const login = useAuthStore((state) => state.login);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [initFinished, setInitFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthMessage = async (event: MessageEvent) => {
      console.log("BroadcastChannel received event:", event.data);
      if (event.data?.type === "LOGOUT") {
        console.log("LOGOUT event received. Clearing local auth and redirecting...");
        clearAuth();
        navigate("/auth");
      } else if (event.data?.type === "LOGIN") {
        console.log("LOGIN event received. Refreshing session to get access token...");
        try {
          const data = await refresh();
          if (data && data.accessToken && data.user) {
            login(data.accessToken, data.user);
            navigate("/");
          }
        } catch (error) {
          console.error("Failed to sync login state via refresh API:", error);
        }
      }
    };

    console.log("Registering BroadcastChannel message listener");
    authChannel.addEventListener("message", handleAuthMessage);
    return () => {
      console.log("Cleaning up BroadcastChannel message listener");
      authChannel.removeEventListener("message", handleAuthMessage);
    };
  }, [clearAuth, login, navigate]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Attempt initial auto-login by calling the refresh endpoint
        const data = await refresh();
        if (data && data.accessToken && data.user) {
          login(data.accessToken, data.user);
        } else {
          clearAuth();
        }


      } catch (error) {
        clearAuth();
      } finally {
        setInitFinished(true);
        // Explicitly set store loading state to false
        useAuthStore.setState({ isLoading: false });
      }
    };

    initializeAuth();
  }, [login, clearAuth]);

  if (!initFinished) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#090d16] text-white">
        <div className="flex flex-col items-center space-y-5 animate-fade-in">
          {/* Custom premium visual element */}
          <div className="relative flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-1 text-center">
            <h2 className="text-lg font-bold tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              SECURE STREAMING
            </h2>
            <p className="text-xs font-semibold text-indigo-400/80 uppercase tracking-widest">
              Initializing Secure Session
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
