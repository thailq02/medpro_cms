"use client";
import React from "react";
import HospitalManagement from "@/module/hospital-management/hospital-management";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function Hospital() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <HospitalManagement />
  ) : (
    <Custom404 />
  );
}
