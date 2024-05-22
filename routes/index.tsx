"use client";
import React, {useEffect} from "react";
import {useRouter, usePathname} from "next/navigation";
import Config from "@/config";
import RouteList, {IRoute} from "@/routes/RouteList";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import {CommonReactProps} from "@/types";
import ApiAuth from "@/apiRequest/ApiAuth";
import LoginComponent from "@/app/(auth)/login/page";
import ModalGlobal from "@/components/ModalGlobal";
import {IGetMeResBody} from "@/apiRequest/ApiUser";
import store, {useAppSelector} from "@/redux/store";
import {loginUser} from "@/redux/slices/UserSlice";

export default function Routes({
  children,
  user,
}: CommonReactProps & {
  user: IGetMeResBody["data"] | undefined;
}): JSX.Element | null {
  const router = useRouter();
  const userStore = useAppSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loginUser({...userStore, user}));
  }, [user]);

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
    const userRole = ApiAuth.getUserRole();
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
          if (ApiAuth.isLogin()) {
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
    if (ApiAuth.isLogin()) {
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
  return (
    <DashboardLayout>
      {children}
      <ModalGlobal />
    </DashboardLayout>
  );
}
