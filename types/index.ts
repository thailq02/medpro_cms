import {IUserLogin} from "@/apiRequest/ApiUser";

export interface CommonReactProps {
   children: React.ReactNode;
}

export interface IModalProps {
   idSelect?: string;
   refetch?: () => void;
}

export enum HospitalsType {
   BENHVIENCONG = 0,
   BENHVIENTU = 1,
   PHONGKHAM = 2,
   PHONGMACH = 3,
   XETNGHIEM = 4,
   YTETAINHA = 5,
   TIEMCHUNG = 6,
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
   user?: IUserLogin;
   access_token?: string;
   refresh_token?: string;
   role?: number;
   expiresAt?: number;
}

export enum TimeScheduleType {
   T1 = "8:00 AM - 9:00 AM",
   T2 = "9:00 AM - 10:00 AM",
   T3 = "10:00 AM - 11:00 AM",
   T4 = "1:00 PM - 2:00 PM",
   T5 = "2:00 PM - 3:00 PM",
   T6 = "3:00 PM - 4:00 PM",
   T7 = "4:00 PM - 5:00 PM",
}
