"use client";
import React from "react";
import {AppProps} from "next/app";
import {useRouter, usePathname} from "next/navigation";
import Config from "@/config";
import RouteList, {IRoute} from "@/routes/RouteList";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import {CommonReactProps} from "@/types";

export default function Routes({
  children,
}: CommonReactProps): JSX.Element | null {
  const pathname = usePathname();
  const login = pathname === Config.PATHNAME.LOGIN;
  console.log("login", login);

  // const isRoute = (key: keyof IRoute): boolean => {
  //   for (const route of RouteList) {
  //     if (router.pathname === route.path) {
  //       // route["path"] => "/" => !!route["path"] => true
  //       return !!route[key];
  //     }
  //   }
  //   return false;
  // };

  // const isRouteRequireRole = (): boolean => {
  //   for (const route of RouteList) {
  //     if (router.pathname === route.path) {
  //       return !!route.role;
  //     }
  //   }
  //   return false;
  // };

  // const isUserRoleAuthorized = (): boolean => {
  //   // const userRole = ApiUser.getUserRole();
  //   const userRole = 1;
  //   if (userRole) {
  //     for (const route of RouteList) {
  //       if (router.pathname === route.path) {
  //         return !!route.role?.includes(userRole);
  //       }
  //     }
  //   }
  //   return false;
  // };

  return <DashboardLayout>{children}</DashboardLayout>;
}
