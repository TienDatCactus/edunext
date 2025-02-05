import {
  ArrowsInLineVertical,
  CalendarDots,
  CaretLeft,
  UserGear,
} from "@phosphor-icons/react";
import type { MenuProps } from "antd";
import { Button, Divider, Menu, Popover } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../utils/zustand/Store";
import { ROUTE_KEYS } from "./../../utils/routes";
import { AccountMenu } from "../_elements/Layout/Header";
type MenuItem = Required<MenuProps>["items"][number];

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const DASHBOARD_KEYS = ROUTE_KEYS?.dashboard;
  const DASHBOARD_LOCATION = location.pathname.split(
    "/"
  )[2] as keyof typeof ROUTE_KEYS.dashboard;
  const { user } = useUserStore();
  const studentItems: MenuItem[] = [
    {
      key: "grp",
      label: <p>Cài đặt chung</p>,
      type: "group",
      children: [
        {
          key: "13",
          className: "py-6",
          onClick: () => window.location.replace(DASHBOARD_KEYS?.account?.path),
          label: <p className="text-[14px] font-medium">Tài khoản</p>,
          icon: (
            <UserGear
              size={34}
              className="p-2 bg-white border rounded-md shadow-md"
            />
          ),
        },
        {
          key: "14",
          className: "py-6",
          onClick: () =>
            window.location.replace(DASHBOARD_KEYS?.timetable?.path),
          label: <p className="text-[14px] font-medium">Thời khóa biểu</p>,
          icon: (
            <CalendarDots
              size={34}
              className="p-2 bg-white border rounded-md shadow-md"
            />
          ),
        },
      ],
    },
  ];
  const teacherItems: MenuItem[] = [
    {
      key: "grp",
      label: <p>Cài đặt chung</p>,
      type: "group",
      children: [
        {
          key: "13",
          className: "py-6",
          onClick: () => window.location.replace(DASHBOARD_KEYS?.account?.path),
          label: <p className="text-[14px] font-medium">Môn học</p>,
          icon: (
            <UserGear
              size={34}
              className="p-2 bg-white border rounded-md shadow-md"
            />
          ),
        },
        {
          key: "14",
          className: "py-6",
          onClick: () =>
            window.location.replace(DASHBOARD_KEYS?.timetable?.path),
          label: <p className="text-[14px] font-medium">Thời khóa biểu</p>,
          icon: (
            <CalendarDots
              size={34}
              className="p-2 bg-white border rounded-md shadow-md"
            />
          ),
        },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-12 h-svh">
      <div className="col-span-2 bg-[#f3f4f7] rounded-md py-4 max-h-svh flex flex-col justify-between">
        <div className="flex items-center gap-2 px-4 py-2">
          <Button
            className="p-2 border rounded-md [box-shadow:rgba(50,_50,_93,_0.25)_0px_2px_5px_-1px,_rgba(0,_0,_0,_0.3)_0px_1px_3px_-1px]"
            onClick={() => navigate(-1)}
          >
            <CaretLeft size={20} />
          </Button>
          <p className="font-bold text-[20px] text-[#464646]">Quay lại</p>
        </div>
        <Divider className="my-2" />
        <Menu
          className="w-full h-full"
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={user?.role == "1" ? studentItems : teacherItems}
          selectedKeys={[ROUTE_KEYS?.dashboard[DASHBOARD_LOCATION]?.key]}
        />
        <Divider className="my-2" />
        <Popover
          overlayInnerStyle={{ padding: 0 }}
          content={<AccountMenu user={user} />}
          trigger="click"
          placement="topRight"
        >
          <div className="flex items-center shadow-lg rounded-md bg-[#ffffff] mx-1 p-2 hover:bg-[#f0f0f0] border cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                src="https://api.dicebear.com/9.x/notionists/svg?seed=1"
                alt="avatar"
                className="w-12 h-12 bg-white border rounded-full"
              />
              <div className="leading-6">
                <h1 className="text-[16px] font-semibold">{user?.name}</h1>
                <p className="text-[12px] font-semibold text-[#5f5f5f]">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </Popover>
      </div>
      <div className="col-span-10 p-2 overflow-y-scroll max-h-svh">
        {/* {children} */}
        <div className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_2px_5px_-1px,_rgba(0,_0,_0,_0.3)_0px_1px_3px_-1px] rounded-md bg-white px-10 py-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
