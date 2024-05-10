export enum IAccountRole {
  ADMIN = 0,
  DOCTOR = 1,
  USER = 2,
}

export interface IAccountInfo {
  accessToken?: string;
  refreshToken?: string;
}
