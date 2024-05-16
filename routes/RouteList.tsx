import {IAccountRole} from "@/types";
import {
  AccountBookOutlined,
  BankOutlined,
  MedicineBoxOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
  {
    path: "/category",
    name: "Quản lý danh mục",
    icon: <MenuUnfoldOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN],
  },
  {
    path: "/medical-booking-forms",
    name: "Quản lý hình thức đặt khám",
    icon: <AccountBookOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN],
  },
  {
    path: "/hospital",
    name: "Quản lý bệnh viện",
    icon: <BankOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN],
  },
  {
    path: "/service",
    name: "Quản lý dịch vụ",
    icon: <SettingOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN],
  },
  {
    path: "/specialty",
    name: "Quản lý chuyên khoa",
    icon: <MedicineBoxOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN],
  },
];

export default routes;
