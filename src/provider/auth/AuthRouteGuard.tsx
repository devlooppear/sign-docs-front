"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/provider/auth/AuthProvide";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import {
  Routes,
  unsignedRoutes,
  signedRoutes,
} from "@/common/constants/routes";
import { UserRole } from "@/enum/userRole";
import { useMe } from "@/hooks/useMe/useMe";

export default function AuthRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogged, user, logout } = useAuth();
  const { navTo } = useNavTo();
  const pathname = usePathname();
  const { refetch } = useMe();

  useEffect(() => {
    if (!isLogged) return;

    const checkToken = async () => {
      try {
        await refetch();
      } catch (err: any) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logout();
        }
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isLogged, refetch, logout]);

  useEffect(() => {
    const allSigned = Object.values(signedRoutes).flat();

    if (!isLogged && allSigned.includes(pathname as Routes)) {
      navTo(Routes.INTRODUCTION, { replace: true });
      return;
    }

    if (isLogged && unsignedRoutes.includes(pathname as Routes)) {
      navTo(Routes.HOME, { replace: true });
      return;
    }

    if (
      isLogged &&
      user?.role &&
      Object.values(UserRole).includes(user.role as UserRole) &&
      Object.keys(signedRoutes).includes(user.role as string)
    ) {
      const allowed = signedRoutes[user.role as UserRole];
      if (
        allowed &&
        allSigned.includes(pathname as Routes) &&
        !allowed.includes(pathname as Routes)
      ) {
        navTo(Routes.HOME, { replace: true });
        return;
      }
    }
  }, [isLogged, user, pathname, navTo]);

  return children;
}
