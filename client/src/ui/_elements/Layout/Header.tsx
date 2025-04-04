import { BellZ, Kanban } from "@phosphor-icons/react";
import { Button, Divider, message, Popover, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/api";
import { getCurrentSeason } from "../../../utils/customHooks";
import { User } from "../../../utils/interfaces";
import { useUserStore } from "../../../utils/zustand/Store";

export const AccountMenu: React.FC<{ user?: User }> = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const routeSwap = () => {
    console.log(user?.role);
    switch (Number(user?.role)) {
      case 3:
        window.location.href = "/admin/course";
        return "";
      case 2:
        return "landing";
      case 1:
        return "account";
    }
  };
  const doLogout = async () => {
    try {
      setLoading(true);
      const resp = await logout();
      if (resp) {
        message.success("Đăng xuất thành công");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-w-[200px]">
      <div className="p-2 px-4 pb-0">
        <h1 className="font-bold text-[16px]">
          {user?.name} #{user?.FEID}
        </h1>
        <p className="my-0 text-[12px]">{user?.email}</p>
      </div>
      <Divider className="my-2 border-[#ccc]" />
      <Spin spinning={loading}>
        <ul className="p-2 pt-0">
          <li>
            <Button
              className="border-none shadow-none hover:bg-[#ededed]"
              block
              onClick={() => navigate(`/dashboard/${routeSwap()}`)}
            >
              Cài đặt
            </Button>
          </li>
          <li>
            <Button
              className="border-none shadow-none hover:bg-[#ededed]"
              block
              onClick={doLogout}
            >
              Đăng xuất
            </Button>
          </li>
        </ul>
      </Spin>
    </div>
  );
};

const Header = () => {
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();

  const location = window.location.pathname;
  const navItems: Array<{ name: string; link: string; active: boolean }> = [
    { name: "Trang chủ", link: "/", active: location === "/" },
    {
      name: "Các môn học",
      link: `/home/${year}/${month}`,
      active: location === `/home/${year}/${month}`,
    },
    {
      name: "Khóa học bên ngoài",
      link: `/externals`,
      active: location === "/externals",
    },
  ];
  const { user } = useUserStore();
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Kanban size={32} />
          <h1 className="font-bold text-[20px]">Sphere</h1>
        </div>
        <ul className="text-[14px] text-black">
          {!!navItems.length &&
            navItems?.map((item, index) => {
              return (
                <li key={index} className="inline-block mx-4 ">
                  <a
                    href={item.link}
                    className={`${item.active ? "font-bold" : ""} `}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <p className="font-semibold">
            {user?.name} #{user?.FEID}
          </p>
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<AccountMenu user={user} />}
            trigger="click"
            placement="bottomRight"
          >
            <img
              loading="lazy"
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.FEID}`}
              alt="dat"
              className="w-10 h-10 bg-white rounded-full shadow-md cursor-pointer active:shadow-none"
            />
          </Popover>
        </div>
        <ul className="flex items-center gap-4 transition-all duration-100">
          <li>
            <BellZ size={22} className="cursor-pointer hover:scale-110" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
