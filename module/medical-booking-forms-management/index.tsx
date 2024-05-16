"use client";
import React from "react";
import Custom404 from "@/components/Layout/NotFound";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";
import MedicalBookingFormsComponent from "@/module/medical-booking-forms-management/medical-booking-forms";

export default function MedicalBookingForms() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <MedicalBookingFormsComponent />
  ) : (
    <Custom404 />
  );
}
