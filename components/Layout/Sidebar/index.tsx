import React from "react";
import "./index.scss";
import Image from "next/image";
import type {MenuProps} from "antd";
import {Menu} from "antd";
import RouterList from "@/routes/RouteList";
import ApiAuth from "@/apiRequest/ApiAuth";
import {IAccountRole} from "@/types";
import {usePathname, useRouter} from "next/navigation";
import {useAppSelector} from "@/redux/store";

const RenderMenu: React.FC<{isOpen: boolean}> = React.memo(({isOpen}) => {
  const pathname = usePathname();
  const router = useRouter();
  const userRole = ApiAuth.getUserRole();

  /**
   * kiểm tra userRole nó nằm trong mảng role ko
   * nếu ko nằm trong !role?.includes(userRole) => trả true
   * !(...) để lấy những thằng nằm trong mảng role
   */
  const menuItems = RouterList.filter(({role}) => {
    // !(role && userRole ? !role?.includes(userRole) : undefined),
    if (!role || !userRole) {
      return true;
    }
    return role.includes(userRole);
  }).map(({path, name, children, icon}) => {
    if (children) {
      return {
        key: path,
        label: name,
        title: name,
        icon: icon,
        children: children
          .filter(
            (child) => !child.role?.includes(userRole ?? IAccountRole.USER),
          )
          .map((child) => ({
            key: path + child.path,
            title: child.name,
            label: child.name,
          })),
      };
    }
    return {
      key: path,
      label: name,
      title: name,
      icon: <div>{icon}</div>,
    };
  });

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      theme="dark"
      defaultSelectedKeys={[pathname]}
      mode="inline"
      // điều khiển trạng thái thu gọn của menu.
      inlineCollapsed={!isOpen}
      items={menuItems}
    />
  );
});
RenderMenu.displayName = "RenderMenu";

export default function Sidebar() {
  const isOpen = useAppSelector((state) => state.menu.isOpen);

  return (
    <div
      className={
        `sidebar absolute md:static ` +
        (isOpen ? "left-0" : "md:w-[80px] md:min-w-[80px]")
      }
    >
      <div className="logo-container">
        <Image src="/img/logo.png" alt="logo" width={50} height={50} />
      </div>
      <RenderMenu isOpen={isOpen} />
    </div>
  );
}
