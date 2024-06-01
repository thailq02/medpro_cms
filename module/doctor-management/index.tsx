"use client";
import React from "react";
import DoctorManagement from "@/module/doctor-management/doctor-management";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function Doctor() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <DoctorManagement />
  ) : (
    <Custom404 />
  );
}
