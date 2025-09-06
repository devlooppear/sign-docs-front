import { UserRole } from "@/enum/userRole";

export enum Routes {
  HOME = "/",
  INTRODUCTION = "/introduction",
  LOGIN = "/login",
  REGISTER = "/register",
  DASHBOARD = "/dashboard",
  DOCUMENT = "/document",
  PROFILE = "/profile",
}

export const unsignedRoutes = [
  Routes.HOME,
  Routes.INTRODUCTION,
  Routes.LOGIN,
  Routes.REGISTER,
];

export const signedRoutes = {
  [UserRole.CLIENT]: [Routes.DASHBOARD, Routes.DOCUMENT, Routes.PROFILE],
  [UserRole.ADMIN]: [Routes.DASHBOARD, Routes.DOCUMENT, Routes.PROFILE],
};
