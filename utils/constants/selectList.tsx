import {
  GenderType,
  HospitalsType,
  IAccountRole,
  PositionType,
  TimeScheduleType,
  VerifyStatus,
} from "@/types";

const LIST_GENDER = [
  {
    value: GenderType.MALE,
    label: <span>Nam</span>,
  },
  {
    value: GenderType.FEMALE,
    label: <span>Nữ</span>,
  },
];

const LIST_POSITION = [
  {
    value: PositionType.NONE,
    label: <span>Người dùng</span>,
  },
  {
    value: PositionType.MASTER,
    label: <span>Thạc sĩ</span>,
  },
  {
    value: PositionType.DOCTOR,
    label: <span>Tiến sĩ</span>,
  },
  {
    value: PositionType.ASSOCIATE_PROFESSOR,
    label: <span>Phó giáo sư</span>,
  },
  {
    value: PositionType.PROFESSOR,
    label: <span>Giáo sư</span>,
  },
];
const LIST_POSITION_DOCTOR = [
  {
    value: PositionType.MASTER,
    label: <span>Thạc sĩ</span>,
  },
  {
    value: PositionType.DOCTOR,
    label: <span>Tiến sĩ</span>,
  },
  {
    value: PositionType.ASSOCIATE_PROFESSOR,
    label: <span>Phó giáo sư</span>,
  },
  {
    value: PositionType.PROFESSOR,
    label: <span>Giáo sư</span>,
  },
];

const LIST_ROLE = [
  {
    value: IAccountRole.ADMIN,
    label: <span>Admin</span>,
  },
  {
    value: IAccountRole.DOCTOR,
    label: <span>Bác sĩ</span>,
  },
  {
    value: IAccountRole.USER,
    label: <span>Người dùng</span>,
  },
];

const LIST_VERIFY_STATUS = [
  {
    value: VerifyStatus.UNVERIFIED,
    label: <span>Chưa xác thực</span>,
  },
  {
    value: VerifyStatus.VERIFIED,
    label: <span>Đã xác thực</span>,
  },
  {
    value: VerifyStatus.BANNED,
    label: <span>Khoá tài khoản</span>,
  },
];

const LIST_HOSPITAL_TYPE = [
  {
    value: HospitalsType.BENHVIENCONG,
    label: "Bệnh viện công",
  },
  {
    value: HospitalsType.BENHVIENTU,
    label: "Bệnh viện tư",
  },
  {
    value: HospitalsType.PHONGKHAM,
    label: "Phòng khám",
  },
  {
    value: HospitalsType.PHONGMACH,
    label: "Phòng mạch",
  },
  {
    value: HospitalsType.XETNGHIEM,
    label: "Xét nghiệm",
  },
  {
    value: HospitalsType.YTETAINHA,
    label: "Y tế tại nhà",
  },
  {
    value: HospitalsType.TIEMCHUNG,
    label: "Tiêm chủng",
  },
];

const LIST_SCHEDULE_TYPE = [
  {
    value: TimeScheduleType.T1,
    label: TimeScheduleType.T1,
  },
  {
    value: TimeScheduleType.T2,
    label: TimeScheduleType.T2,
  },
  {
    value: TimeScheduleType.T3,
    label: TimeScheduleType.T3,
  },
  {
    value: TimeScheduleType.T4,
    label: TimeScheduleType.T4,
  },
  {
    value: TimeScheduleType.T5,
    label: TimeScheduleType.T5,
  },
  {
    value: TimeScheduleType.T6,
    label: TimeScheduleType.T6,
  },
  {
    value: TimeScheduleType.T7,
    label: TimeScheduleType.T7,
  },
];

const LIST_TYPE_SERVICE = [
  {value: "service", label: "Dịch vụ"},
  {value: "package", label: "Gói khám sức khoẻ"},
  {value: "vaccine", label: "Tiêm chủng"},
];

export const OPTIONS = {
  LIST_GENDER,
  LIST_ROLE,
  LIST_VERIFY_STATUS,
  LIST_POSITION,
  LIST_HOSPITAL_TYPE,
  LIST_POSITION_DOCTOR,
  LIST_SCHEDULE_TYPE,
  LIST_TYPE_SERVICE,
};
