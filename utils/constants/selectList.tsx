import {GenderType, IAccountRole, PositionType, VerifyStatus} from "@/types";

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

export const OPTIONS = {
  LIST_GENDER,
  LIST_ROLE,
  LIST_VERIFY_STATUS,
  LIST_POSITION,
};
