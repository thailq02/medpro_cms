"use client";
import Custom404 from "@/components/Layout/NotFound";
import PatientDoctor from "@/module/patient-management/doctor/patient-doctor";
import {IAccountRole} from "@/types";
import {CheckPermission} from "@/utils/check-event/CheckPermission";

export default function PatientDoctorManagement() {
  return CheckPermission([IAccountRole.DOCTOR]) ? (
    <PatientDoctor />
  ) : (
    <Custom404 />
  );
}
