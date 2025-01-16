import {
  Bell,
  MagnifyingGlass,
  PencilLine,
  ShareNetwork,
  Trash,
  UploadSimple,
  UserCircleDashed,
  UserCirclePlus,
} from "@phosphor-icons/react";
import { Avatar, Button, Divider, Input } from "antd";
import React, { useState } from "react";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import TimetableCalendar from "./sub_elements/TimetableCalendar";
import { User } from "../../../../utils/interfaces";
import dayjs from "dayjs";
const Timetable: React.FC = () => {
  const [user, setUser] = useState<User>();
  const token = window.localStorage.getItem("edu-token");
  const userToken = token ? JSON.parse(token) : null;
  React.useEffect(() => {
    if (userToken) {
      setUser(userToken.user);
    }
  }, []);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold">Thời khóa biểu</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Button icon={<ShareNetwork size={22} />} className="border-none" />
            <Button icon={<Bell size={22} />} className="border-none" />
          </div>
          <Divider className="m-0 border-[#ccc]" type="vertical" />
          <div className="flex items-center gap-2">
            <Avatar size="default" icon={<UserCircleDashed size={22} />} />
            <div className="flex flex-col ">
              <h1 className="text-[14px] font-semibold">{user?.name}</h1>
              <p className="text-[12px] text-[#212121]">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-2 border-[#ddd]" />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button iconPosition="start" icon={<UploadSimple size={14} />}>
            Xuất File
          </Button>
          <Button iconPosition="start" icon={<Trash size={14} />}>
            Thời gian biểu đã xóa
          </Button>
        </div>
        <Button
          iconPosition="start"
          icon={<UserCirclePlus size={14} />}
          variant="outlined"
          color="primary"
        >
          Mời
        </Button>
      </div>
      <Divider className="my-2 border-[#ddd]" />
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-start gap-1">
            <h1 className="text-[34px] font-semibold">
              {dayjs().format("MMMM YYYY")}
            </h1>
            <Button icon={<PencilLine size={22} />} className="border-none" />
          </div>
          <p className="text-[14px] text-[#3d3d3d]">
            {dayjs().format("MMMM d YYYY")} - {dayjs().format("MMMM d YYYY")}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Input
            size="large"
            className="*:quick-sand"
            placeholder="Search"
            prefix={<MagnifyingGlass size={16} />}
          />
          <Button type="primary">Thêm thời gian biểu</Button>
        </div>
      </div>
      <TimetableCalendar />
    </DashboardLayout>
  );
};

export default Timetable;
