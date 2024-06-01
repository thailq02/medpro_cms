"use client";
import SpecialtyManagement from "@/module/specialty-management/specialty-management";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function Specialty() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <SpecialtyManagement />
  ) : (
    <Custom404 />
  );
}
