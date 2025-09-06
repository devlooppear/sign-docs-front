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

export default function AuthRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogged, user } = useAuth();
  const { navTo } = useNavTo();
  const pathname = usePathname();

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
