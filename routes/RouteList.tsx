import {IAccountRole} from "@/types";
import {UserOutlined} from "@ant-design/icons";

export interface IRoute {
  path: string;
  name: string;
  role?: Array<IAccountRole>;
  icon?: React.JSX.Element | string;
  isSidebar?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isUpdating?: boolean;
  isAuth?: boolean;
  isSSR?: boolean;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: "/",
    name: "Quản lý người dùng",
    icon: <UserOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN],
  },
];

export default routes;
