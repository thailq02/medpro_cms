"use client";
import ButtonLogout from "@/components/ButtonLogout";
import Icon from "@/components/Icon/Icon";
import ContentModalChangePassword from "@/components/Layout/Navbar/ModalChangePassword";
import {addModal} from "@/components/ModalGlobal";
import {toggleMenu} from "@/redux/slices/MenuSlice";
import {useAppSelector} from "@/redux/store";
import routes from "@/routes/RouteList";
import {MenuOutlined} from "@ant-design/icons";
import {Dropdown, Image, Menu} from "antd";
import {usePathname} from "next/navigation";
import {useDispatch} from "react-redux";
import "./index.scss";

function RenderNamePage() {
  const dataRoutes = routes;
  const pathname = usePathname();
  const dataRoutesConvert: {path: string; name: string}[] = [];
  dataRoutes.forEach((val) => {
    if (val.children) {
      val.children.forEach((val2) => {
        dataRoutesConvert.push({
          path: val.path + val2.path,
          name: val2.name,
        });
      });
    } else {
      dataRoutesConvert.push({path: val.path, name: val.name});
    }
  });
  return dataRoutesConvert?.find((val) => val.path === pathname)?.name;
}

export default function Navbar(): JSX.Element {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOpenModalChangePassword = (): void => {
    addModal({
      content: <ContentModalChangePassword />,
      options: {title: "Đổi mật khẩu", widthModal: 500},
    });
  };

  const renderDropdown = (): JSX.Element => (
    <Menu>
      <Menu.Item key="0" onClick={handleOpenModalChangePassword}>
        <div>
          <Icon icon="BlockUser" size={20} color="#000" className="mr-2" />
          Đổi mật khẩu
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <div>
          <ButtonLogout
            isOpen={true}
            icon={
              <Icon icon="SignOut" size={20} color="black" className="mr-2" />
            }
          />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar flex items-center justify-between">
      <div className="flex items-center">
        <MenuOutlined
          onClick={(): void => {
            dispatch(toggleMenu());
          }}
        />
        <div className="ml-5">
          <RenderNamePage />
        </div>
      </div>
      <div className="group-user-info">
        <Dropdown overlay={renderDropdown()} trigger={["click"]}>
          <div className="cursor-pointer flex items-center">
            <Image
              src={user?.user?.avatar || "/img/avatar/avatar.jpg"}
              preview={false}
              width={30}
              height={30}
              fallback="/img/avatar/avatar.jpg"
              className="rounded-full"
              alt="avatar"
            />
            <span className="text-[14px] ml-2 hidden md:flex">
              {user?.user?.name ?? ""}
            </span>
            {user?.user?.name && (
              <Icon icon="ArrowDown" size={20} color="#000" />
            )}
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
