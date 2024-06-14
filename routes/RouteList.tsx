import {IAccountRole} from "@/types";
import {
  AccountBookOutlined,
  BankOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  WhatsAppOutlined,
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
  {
    path: "/doctor",
    name: "Quản lý bác sĩ",
    icon: <TeamOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN],
  },
  {
    path: "/schedule",
    name: "Quản lý lịch trình",
    icon: <CalendarOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN, IAccountRole.DOCTOR],
  },
  {
    path: "/schedule/doctor",
    name: "Quản lý lịch trình cá nhân",
    icon: <ScheduleOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.DOCTOR],
  },
  {
    path: "/manage-patient",
    name: "Quản lý lịch đặt khám",
    icon: <WhatsAppOutlined />,
    isSSR: true,
    isSidebar: true,
    role: [IAccountRole.ADMIN, IAccountRole.DOCTOR],
  },
];

export default routes;
