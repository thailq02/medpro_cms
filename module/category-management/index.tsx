"use client";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import CategoryManagement from "@/module/category-management/category-management";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function Category() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <CategoryManagement />
  ) : (
    <Custom404 />
  );
}
