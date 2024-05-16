"use client";

import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";
import SpecialtyComponent from "@/module/specialty-management/specialty";

export default function SpecialtyManagement() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <SpecialtyComponent />
  ) : (
    <Custom404 />
  );
}
