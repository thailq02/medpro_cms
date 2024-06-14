"use client";
import Custom404 from "@/components/Layout/NotFound";
import PatientAdmin from "@/module/patient-management/admin/patient-admin";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function PatientAdminManagement() {
  return CheckPermission([IAccountRole.ADMIN]) ? (
    <PatientAdmin />
  ) : (
    <Custom404 />
  );
}
