import http from "@/apiRequest/http";

interface IGetMeResBody {
  message: string;
  data: {
    _id?: string;
    name?: string;
    email?: string;
    date_of_birth?: string;
    gender?: number;
    created_at?: Date;
    updated_at?: Date;
    verify?: number;
    address?: string;
    username?: string;
    avatar?: string;
    role?: number;
    phone_number?: string;
    position?: number;
  };
}

const path = {
  getMe: "/users/me",
};

const ApiUser = {
  getMe: () => http.get<IGetMeResBody>(path.getMe),
};

export default ApiUser;
