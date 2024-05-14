export interface CommonReactProps {
  children: React.ReactNode;
}

export enum IAccountRole {
  ADMIN = 0,
  DOCTOR = 1,
  USER = 2,
}

export interface IAccountInfo {
  access_token?: string;
  refresh_token?: string;
  role?: number;
}
