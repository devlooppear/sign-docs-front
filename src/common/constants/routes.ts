import { UserRole } from "@/enum/userRole";

export enum Routes {
  HOME = "/",
  INTRODUCTION = "/introduction",
  LOGIN = "/login",
  REGISTER = "/register",
  DASHBOARD = "/dashboard",
  DOCUMENT = "/document",
  PROFILE = "/profile",
  TO_SIGN = "/to-sign",
}

export const unsignedRoutes = [
  Routes.INTRODUCTION,
  Routes.LOGIN,
  Routes.REGISTER,
];

export const signedRoutes = {
  [UserRole.CLIENT]: [
    Routes.DOCUMENT,
    Routes.PROFILE,
    Routes.TO_SIGN,
    Routes.HOME,
  ],
  [UserRole.ADMIN]: [
    Routes.DASHBOARD,
    Routes.DOCUMENT,
    Routes.PROFILE,
    Routes.HOME,
  ],
};
