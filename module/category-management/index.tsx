"use client";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import CategoryManagerComponent from "@/module/category-management/category-manager";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function CategoryManagement() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <CategoryManagerComponent />
  ) : (
    <Custom404 />
  );
}
