export interface CommonReactProps {
  children: React.ReactNode;
}

export interface IModalProps {
  idSelect?: string;
  refetch?: () => void;
}

export enum IAccountRole {
  ADMIN = 0,
  DOCTOR = 1,
  USER = 2,
}

export enum GenderType {
  MALE = 0,
  FEMALE = 1,
}

export enum PositionType {
  NONE = 0, // Người dùng
  MASTER = 1, // Thạc sĩ
  DOCTOR = 2, // Tiến sĩ
  ASSOCIATE_PROFESSOR = 3, // Phó giáo sư
  PROFESSOR = 4, // Giáo sư
}

export enum VerifyStatus {
  UNVERIFIED = 0, // chưa xác thực email, mặc định = 0
  VERIFIED = 1, // đã xác thực emails
  BANNED = 2, // bị khoá
}
export interface IAccountInfo {
  access_token?: string;
  refresh_token?: string;
  role?: number;
}
