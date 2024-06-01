"use client";
import ScheduleManagement from "@/module/schedule-management/schedule-management";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function Schedule() {
  return CheckPermission([IAccountRole.ADMIN, IAccountRole.DOCTOR]) ? (
    <ScheduleManagement />
  ) : (
    <Custom404 />
  );
}
