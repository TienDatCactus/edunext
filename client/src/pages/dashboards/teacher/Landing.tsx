import { CalendarDots } from "@phosphor-icons/react";
import { Button, Checkbox } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ClassBlock from "../../../ui/_elements/Page/Dashboard/Teacher/ClassBlock";
import { CourseBlock } from "../../../ui/_elements/Page/Dashboard/Teacher/CourseBlock";
import CourseraBlock from "../../../ui/_elements/Page/Dashboard/Teacher/CourseraBlock";
import { LessonTable } from "../../../ui/_elements/Page/Dashboard/Teacher/LessonTable";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { useUserStore } from "../../../utils/zustand/Store";

const Landing: React.FC = () => {
  const { user } = useUserStore();
  const [selected, setSelected] = useState<string>("");
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-8">
          <div className="my-2 font-semibold">
            <h1 className="text-[2.5rem]">
              <span className="text-[#a4a4a4]">Chào mừng trở lại, </span>
              <span>{user?.name} !</span>
            </h1>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <CourseBlock />
            <ClassBlock />
          </div>
          <LessonTable />
        </div>
        <div className="flex flex-col col-span-4 gap-2 my-2">
          <div className="p-4 bg-white shadow-md rounded-2xl">
            <div className="flex items-center justify-between">
              <h1 className="text-[1.625rem] font-bold">Hoạt động </h1>
              <div className="border border-[#c9c9c9] p-1 rounded-full">
                <CalendarDots size={18} />
              </div>
            </div>
            <div className="my-2">
              <h1 className="text-[1.25rem] font-semibold m-0">
                {dayjs().format("dddd MM/YYYY")}
              </h1>
              <p className="text-[0.75rem] text-[#878787]">
                Hoạt động trong tuần này
              </p>
            </div>
            <ul className="flex flex-wrap max-w-full gap-2 my-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <li>
                  <Button
                    key={index}
                    type={index % 2 == 0 ? "primary" : "default"}
                    className={`${
                      index % 2 == 0 && "bg-[#c2e8f6] text-[#000]"
                    } px-3 py-4`}
                  >
                    {day}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-white shadow-md rounded-2xl">
            <h1 className="text-[1.625rem] font-bold">Công việc hàng ngày</h1>
            <ul className="flex flex-col gap-2 my-2">
              <li className="flex items-center justify-between">
                <Checkbox className="[&_.ant-checkbox-inner]:p-4 [&_.ant-checkbox-inner::after]:inset-0 [&_.ant-checkbox-inner::after]:m-auto  [&_.ant-checkbox-inner::after]:mb-2">
                  <div>
                    <p className="text-[0.375rem] text-[#878787]">
                      Chưa hoàn thành
                    </p>
                    <h1 className="text-[18px] font-semibold">Nigger</h1>
                  </div>
                </Checkbox>
                <div className="flex items-baseline gap-1 bg-[#f6f5fa] p-1 rounded-md">
                  <p className="text-[1rem]">12</p>
                  <span className="text-[0.5rem]">phút</span>
                </div>
              </li>
            </ul>
            <Button className="font-semibold text-white bg-black" block>
              Tới thời khóa biểu
            </Button>
          </div>
          <CourseraBlock />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Landing;
