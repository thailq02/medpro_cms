"use client";
import ModalConfirmCustom from "@/components/ModalConfirmCustom";
import ApiAuth from "@/apiRequest/ApiAuth";
import {usePathname, useRouter} from "next/navigation";
import {persistor, useAppDispatch} from "@/redux/store";
import {logoutUser} from "@/redux/slices/UserSlice";
import {isValidElement} from "react";

interface IButtonLogoutProps {
   isOpen?: boolean;
   icon?: React.ReactElement;
}
/**
 * isOpen: boolean
 * Khi click vào icon thu gọn Sidebart thì sẽ không hiển thị chữ "Đăng xuất"
 * @returns
 */
export default function ButtonLogout({
   isOpen = false,
   icon,
}: IButtonLogoutProps) {
   const router = useRouter();
   const pathname = usePathname();
   const dispatch = useAppDispatch();
   const handleLogout = () => {
      ModalConfirmCustom({
         title: "Đăng xuất",
         content: "Bạn có chắc chắn muốn đăng xuất?",
         handleOke: async () => {
            try {
               await ApiAuth.logoutFromNextClientToNextServer();
               persistor
                  .purge()
                  .then(() => {
                     dispatch(logoutUser());
                     router.push("/login");
                  })
                  .catch(() => {
                     window.alert(
                        "Trình duyệt bị lỗi. Xóa Cookie trình duyệt và thử lại",
                     );
                  });
            } catch (error) {
               await ApiAuth.logoutFromNextClientToNextServer(true).then(() =>
                  router.push(`/login?redirect=${pathname}`),
               );
            } finally {
               router.refresh();
            }
         },
      });
   };
   return (
      <div
         className="sidebar-item cursor-pointer"
         role="presentation"
         onClick={handleLogout}
      >
         {isValidElement(icon) && icon}
         {isOpen && <span>Đăng xuất</span>}
      </div>
   );
}
