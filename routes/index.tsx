import {AppProps} from "next/app";
import {useRouter} from "next/router";
import React from "react";
import Config from "../config";
import RouteList, {IRoute} from "@/routes/RouteList";

export default function Routes({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element | null {
  const routerNext = useRouter();

  const login = routerNext.pathname === Config.PATHNAME.LOGIN;

  const isRoute = (key: keyof IRoute): boolean => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        // route["path"] => "/" => !!route["path"] => true
        return !!route[key];
      }
    }
    return false;
  };

  const isRouteRequireRole = (): boolean => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        return !!route.role;
      }
    }
    return false;
  };

  const isUserRoleAuthorized = (): boolean => {
    // const userRole = ApiUser.getUserRole();
    const userRole = 1;
    if (userRole) {
      for (const route of RouteList) {
        if (router.pathname === route.path) {
          return !!route.role?.includes(userRole);
        }
      }
    }
    return false;
  };

  return <div>Routes</div>;
}
