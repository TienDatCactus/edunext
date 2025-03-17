import React from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { useUserStore } from "../../../utils/zustand/Store";
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  MenuProps,
  Radio,
  Segmented,
  Switch,
  Tag,
} from "antd";
import { currentYear } from "../../course/home/HomePage";
import {
  Archive,
  CalendarBlank,
  ClockClockwise,
  FolderPlus,
  GridFour,
  Trash,
} from "@phosphor-icons/react";
import dayjs from "dayjs";
import style from "antd/es/affix/style";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a rel="noopener noreferrer" href={`/home/${currentYear}/spring`}>
        SPRING {currentYear}
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a rel="noopener noreferrer" href={`/home/${currentYear}/summer`}>
        SUMMER {currentYear}
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a rel="noopener noreferrer" href={`/home/${currentYear}/fall`}>
        FALL {currentYear}
      </a>
    ),
  },
];

const CoursesByTeacher: React.FC = () => {
  const { user } = useUserStore();
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between my-2 ">
        <div>
          <p className="text-[#878787] text-[0.5rem]">Quản trị trang</p>
          <h1 className="text-[2rem] font-semibold">
            Các môn học quản lí bởi {user?.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <Button
              icon={<CalendarBlank size={22} />}
              className="px-8 py-6 border-none  rounded-none text-[16px]"
            >
              Kì Học
            </Button>
          </Dropdown>
          <Button
            icon={<FolderPlus size={22} />}
            type="primary"
            className="border-none "
          >
            Thêm môn học
          </Button>
        </div>
      </div>
      <Divider className="border-[#b3b3b3] my-4" />
      <div className="flex items-center justify-between mb-4">
        <Segmented
          className="shadow-md"
          options={["Tất cả", "Đang hoạt động", "Tạm ngừng"]}
        />
        <div className="flex items-center gap-2">
          <Button icon={<Trash size={22} />} type="primary" danger>
            Xóa
          </Button>
          <GridFour size={24} weight="fill" />
        </div>
      </div>
      <div>
        <ul>
          <Radio.Group
            className="grid grid-cols-12 gap-2"
            defaultValue="a"
            buttonStyle="solid"
          >
            <li className="p-2 bg-white border rounded-lg shadow-md md:col-span-4">
              <Radio
                value="a"
                className="w-full [&_span:not(.ant-radio)]:w-[95%] [&_.ant-radio]:w-[5%]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 border rounded-full">
                    <Archive size={20} />
                  </div>
                  <div className="flex items-center gap-1 *:text-[#878787]">
                    <ClockClockwise size={18} />
                    <p>{dayjs().to(dayjs("1990-01-01"))}</p>
                  </div>
                </div>
                <div>
                  <h1 className="truncate text-[1rem] line-clamp-3 font-semibold text-wrap ">
                    Lorem ipsum dolor
                  </h1>
                  <p className="truncate line-clamp-2 text-wrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium ad ratione temporibus aspernatur doloremque
                    libero voluptatibus molestias delectus eaque dolorem nam
                    quam nisi, ipsam id consectetur ipsum voluptatem doloribus
                    deleniti.
                  </p>
                </div>
              </Radio>
              <Divider className="my-2 border-[#c9c9c9]" />
              <div className="flex items-center justify-between">
                <div>
                  <Tag className="border-none bg-[#f3f3f3] rounded-3xl">
                    CSI101
                  </Tag>
                  <Tag className="border-none bg-[#f3f3f3] rounded-3xl">IT</Tag>
                </div>
                <Switch defaultChecked />
              </div>
            </li>
            <li className="p-2 bg-white border rounded-lg md:col-span-4">
              <Radio
                value="b"
                className="w-full [&_span:not(.ant-radio)]:w-[95%] [&_.ant-radio]:w-[5%]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 border rounded-full">
                    <Archive size={20} />
                  </div>
                  <div className="flex items-center gap-1 *:text-[#878787]">
                    <ClockClockwise size={18} />
                    <p>{dayjs().to(dayjs("1990-01-01"))}</p>
                  </div>
                </div>
                <div>
                  <h1 className="truncate text-[1rem] line-clamp-3 font-semibold text-wrap ">
                    Lorem ipsum dolor
                  </h1>
                  <p className="truncate line-clamp-2 text-wrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium ad ratione temporibus aspernatur doloremque
                    libero voluptatibus molestias delectus eaque dolorem nam
                    quam nisi, ipsam id consectetur ipsum voluptatem doloribus
                    deleniti.
                  </p>
                </div>
              </Radio>
              <Divider className="my-2 border-[#c9c9c9]" />
              <div className="flex items-center justify-between">
                <div>
                  <Tag className="border-none bg-[#f3f3f3] rounded-3xl">
                    CSI101
                  </Tag>
                  <Tag className="border-none bg-[#f3f3f3] rounded-3xl">IT</Tag>
                </div>
                <Switch defaultChecked />
              </div>
            </li>
            <li className="p-2 bg-white border rounded-lg md:col-span-4">
              <Radio
                value="c"
                className="w-full [&_span:not(.ant-radio)]:w-[95%] [&_.ant-radio]:w-[5%]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 border rounded-full">
                    <Archive size={20} />
                  </div>
                  <div className="flex items-center gap-1 *:text-[#878787]">
                    <ClockClockwise size={18} />
                    <p>{dayjs().to(dayjs("1990-01-01"))}</p>
                  </div>
                </div>
                <div>
                  <h1 className="truncate text-[1rem] line-clamp-3 font-semibold text-wrap ">
                    Lorem ipsum dolor
                  </h1>
                  <p className="truncate line-clamp-2 text-wrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium ad ratione temporibus aspernatur doloremque
                    libero voluptatibus molestias delectus eaque dolorem nam
                    quam nisi, ipsam id consectetur ipsum voluptatem doloribus
                    deleniti.
                  </p>
                </div>
              </Radio>
              <Divider className="my-2 border-[#c9c9c9]" />
              <div className="flex items-center justify-between">
                <div>
                  <Tag className="border-none bg-[#f3f3f3] rounded-3xl">
                    CSI101
                  </Tag>
                  <Tag className="border-none bg-[#f3f3f3] rounded-3xl">IT</Tag>
                </div>
                <Switch defaultChecked />
              </div>
            </li>
          </Radio.Group>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default CoursesByTeacher;
