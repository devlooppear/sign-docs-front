"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useLogin,
  LoginVariables,
  LoginResponse,
} from "@/hooks/useLogin/useLogin";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { Routes } from "@/common/constants/routes";
import Loader from "@/components/Loader/Loader";

interface AuthContextType {
  token: string | null;
  user: LoginResponse["user"] | null;
  isLogged: boolean;
  login: (variables: LoginVariables) => void;
  loginAsync: (variables: LoginVariables) => Promise<any>;
  isPending: boolean;
  isError: boolean;
  error: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [isReady, setIsReady] = useState(false);

  const { navTo } = useNavTo();
  const { mutate, mutateAsync, isPending, isError, error, data } = useLogin();

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const localToken = localStorage.getItem("token");
      const localUser = localStorage.getItem("user");
      setToken(localToken);
      setUser(localUser ? JSON.parse(localUser) : null);
    } catch (err) {
      console.warn("Erro ao ler localStorage:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") {
        const localToken = localStorage.getItem("token");
        if (localToken !== token) {
          logout();
        }
      }
    };
    window.addEventListener("storage", onStorage);

    const interval = setInterval(() => {
      const localToken = localStorage.getItem("token");
      if (localToken !== token) logout();
    }, 1000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, [token]);

  useEffect(() => {
    if (data?.token) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, [data]);

  const login = (variables: LoginVariables) => mutate(variables);

  const loginAsync = async (variables: LoginVariables) => {
    const result = await mutateAsync(variables);
    return result;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navTo(Routes.INTRODUCTION, { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isLogged: !!token,
      login,
      loginAsync,
      isPending,
      isError,
      error,
      logout,
    }),
    [token, user, isPending, isError, error]
  );

  if (!isReady || isPending) {
    return <Loader inAll />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
