import { Download, Plus, SlidersHorizontal } from "@phosphor-icons/react";
import { Avatar, Badge, Button, Divider, Tabs, Tooltip } from "antd";
import React from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { LessonsList } from "./sub_elements/LessonsList";
const LessonsByTeacher: React.FC = () => {
  const items = [
    {
      key: "1",
      label: (
        <Badge count={5} color="blue" offset={[12, 0]}>
          <p className="active-text">Tất cả</p>
        </Badge>
      ),
      children: <LessonsList state={"all"} />,
    },
    {
      key: "2",
      label: (
        <Badge count={5} color="blue" offset={[12, 0]}>
          <p className="active-text">Chưa hoàn thành</p>
        </Badge>
      ),
      children: <LessonsList state={"done"} />,
    },
    {
      key: "3",
      label: (
        <Badge count={5} color="blue" offset={[12, 0]}>
          <p className="active-text">Đã hoàn thành</p>
        </Badge>
      ),
      children: <LessonsList state={"undone"} />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-[36px]">Danh sách chương</h1>
          <p className="text-[#878787]">Danh sách các chương học đã tạo </p>
        </div>
        <div className="flex items-center">
          <Avatar.Group className="*:border *:border-[#878787]">
            <Avatar src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Christopher&flip=true" />
            <Avatar src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=George&flip=true" />
            <Tooltip title="Ant User" placement="top">
              <Avatar src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jack&flip=true" />
            </Tooltip>
            <Avatar src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Riley&flip=true" />
          </Avatar.Group>
          <Divider type="vertical" className="h-6 border-[#878787]" />
          <Button
            icon={<Download size={18} />}
            type="primary"
            className="rounded-xl"
          >
            Xuất file CSV
          </Button>
        </div>
      </div>
      <Tabs
        className="[&_.ant-tabs-nav]:bg-white [&_.ant-tabs-nav]:px-4 [&_.ant-tabs-nav]:shadow-md [&_.ant-tabs-nav]:rounded-lg my-4 [&_.ant-tabs-tab]:text-[#878787] [&_.ant-tabs-tab]:text-[16px] [&_.ant-tabs-tab-active_.ant-badge_.active-text]:text-[#1890ff] [&_.ant-tabs-tab-active]:border-b-[#1890ff] [&_.ant-tabs-tab-active]:border-2 [&_.ant-tabs-tab-active]:font-semibold"
        tabBarExtraContent={
          <div className="flex items-center gap-2">
            <Button
              type="default"
              className="rounded-xl"
              icon={<SlidersHorizontal size={18} />}
            >
              Sắp xếp
            </Button>
            <Button
              type="default"
              className="rounded-xl"
              icon={<Plus size={18} />}
            >
              Thêm chương
            </Button>
          </div>
        }
        items={items}
      />
    </DashboardLayout>
  );
};

export default LessonsByTeacher;
