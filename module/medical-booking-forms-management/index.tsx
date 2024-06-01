"use client";
import React from "react";
import MedicalBookingFormsManagement from "@/module/medical-booking-forms-management/medical-booking-forms-management";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function MedicalBookingForms() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <MedicalBookingFormsManagement />
  ) : (
    <Custom404 />
  );
}
