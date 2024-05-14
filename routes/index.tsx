"use client";
import React from "react";
import {useRouter, usePathname} from "next/navigation";
import Config from "@/config";
import RouteList, {IRoute} from "@/routes/RouteList";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import {CommonReactProps} from "@/types";
import ApiUser from "@/apiRequest/ApiUser";
import LoginComponent from "@/app/(auth)/login/page";
import store from "@/redux/store";

export default function Routes({
  children,
}: CommonReactProps): JSX.Element | null {
  const router = useRouter();
  const pathname = usePathname();
  const login = pathname === Config.PATHNAME.LOGIN;

  const isRoute = (key: keyof IRoute): boolean => {
    for (const route of RouteList) {
      if (pathname === route.path) {
        // route["path"] => "/" => !!route["path"] => true
        return !!route[key];
      }
    }
    return false;
  };

  const isRouteRequireRole = (): boolean => {
    for (const route of RouteList) {
      if (pathname === route.path) {
        return !!route.role;
      }
    }
    return false;
  };

  const isUserRoleAuthorized = (): boolean => {
    const userRole = ApiUser.getUserRole();
    if (userRole) {
      for (const route of RouteList) {
        if (pathname === route.path) {
          return !!route.role?.includes(userRole);
        }
      }
    }
    return false;
  };

  const isPrivateRoute = (): boolean | undefined => {
    for (const route of RouteList) {
      if (pathname === route.path) {
        if (route.isPrivate === undefined) {
          if (ApiUser.isLogin()) {
            return route.isPrivate;
          }
          return true;
        }
        return route.isPrivate;
      }
    }
    return false;
  };

  const goToLogin = (): null => {
    router.push(Config.PATHNAME.LOGIN);
    return null;
  };

  if (typeof window === "undefined") {
    return null;
  }

  if (login) {
    return <LoginComponent />;
  }
  if (isRoute("isPublic")) {
    return <>{children}</>;
  }

  if (isRoute("isAuth")) {
    return goToLogin();
  }

  if (isPrivateRoute()) {
    if (ApiUser.isLogin()) {
      if (isRouteRequireRole()) {
        if (!isUserRoleAuthorized()) {
          router.push(Config.PATHNAME.HOME);
          return null;
        }
      }
      return <DashboardLayout>{children}</DashboardLayout>;
    }
    return goToLogin();
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
