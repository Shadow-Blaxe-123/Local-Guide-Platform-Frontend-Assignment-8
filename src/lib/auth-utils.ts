//  Types

import { UserRole } from "@/types";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/register"];
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings", "/change-password"],
  patterns: [],
};
export const guideProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/guide/],
};
export const touristProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/],
};
export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/],
};

export const isAuthRoutes = (pathName: string) => {
  return authRoutes.some((route) => route === pathName);
};

export const isRouteMatches = (
  pathName: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathName)) {
    return true;
  }
  return routes.patterns.some((pattern) => pattern.test(pathName));
};

export const getRouteOwner = (
  pathName: string
): "ADMIN" | "GUIDE" | "TOURIST" | "COMMON" | null => {
  if (isRouteMatches(pathName, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathName, guideProtectedRoutes)) {
    return "GUIDE";
  }
  if (isRouteMatches(pathName, touristProtectedRoutes)) {
    return "TOURIST";
  }
  if (isRouteMatches(pathName, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "GUIDE") {
    return "/guide/dashboard";
  }
  if (role === "TOURIST") {
    return "/dashboard";
  }
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }
  if (routeOwner === role) {
    return true;
  }
  return false;
};
