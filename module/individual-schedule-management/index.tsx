"use client";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";
import IndividualScheduleManagement from "@/module/individual-schedule-management/individual-schedule-management";

export default function IndividualSchedule() {
  return CheckPermission([IAccountRole.ADMIN, IAccountRole.DOCTOR]) ? (
    <IndividualScheduleManagement />
  ) : (
    <Custom404 />
  );
}
