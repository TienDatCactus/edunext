import React, { useState } from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import {
  ArrowsOutSimple,
  Bandaids,
  CalendarDots,
  CornersOut,
  Notebook,
  Play,
} from "@phosphor-icons/react";
import { Button, Progress, Tag } from "antd";
import dayjs from "dayjs";
import { useUserStore } from "../../../utils/zustand/Store";
const Landing: React.FC = () => {
  const { user } = useUserStore();
  const [selected, setSelected] = useState<string>("");
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-8 ">
          <div className="my-2 font-semibold">
            <h1 className="text-[2.5rem]">
              <span className="text-[#a4a4a4]">Chào mừng trở lại, </span>
              <span>{user?.name} !</span>
            </h1>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 p-4 bg-white border shadow-md rounded-2xl">
              <div className="flex items-center justify-between ">
                <h1 className="font-bold text-[1.625rem]">Theo dõi môn học</h1>
                <Button className="p-2 border rounded-full cursor-pointer">
                  <ArrowsOutSimple size={18} />
                </Button>
              </div>
              <ul className="flex flex-col gap-2 my-4">
                <li className="bg-[#c2e8f6] p-2 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Tag className="px-2 my-2 border-none rounded-3xl">
                        tag o day
                      </Tag>
                      <h1 className="text-[1rem]">Ten mon hoc</h1>
                    </div>
                    <div className="p-2 border rounded-full border-[#4b4b4b]">
                      <Notebook size={20} />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Progress percent={30} strokeColor={"#fde1ac"} />
                      <p>Tiến trình</p>
                    </div>
                  </div>
                </li>
                <li className="bg-[#f6f8fa] p-2 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h1>Ten mon hoc</h1>
                    <Button className="p-2 border rounded-full border-[#4b4b4b] cursor-pointer">
                      <CornersOut size={18} />
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-span-6 p-4 bg-white border shadow-md rounded-2xl">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-[1.625rem]">Theo dõi lớp học</h1>
                <Button
                  icon={<Play size={14} />}
                  className="p-2 text-[0.75rem] rounded-2xl"
                >
                  Kiểm tra
                </Button>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-baseline gap-1">
                  <h1 className="text-[60px]">30</h1>
                  <span className="text-[20px]">lop</span>
                </div>
                <div className="text-[#727272] text-[0.75rem]">
                  <p>Được giao vào</p>
                  <p>{dayjs().format("DD/MM/YYYY")} </p>
                </div>
              </div>
              <ul className="grid flex-wrap grid-cols-12 gap-2">
                <li className="min-h-[5rem] max-h-[7.5rem] bg-[#fafafc] p-2 flex-col flex justify-between shadow-md rounded-xl col-span-6 ">
                  <h1>Lop SE1834</h1>
                  <Progress
                    strokeWidth={24}
                    className="[&_.ant-progress-inner]:rounded-md [&_.ant-progress-inner]:w-[7.5rem]"
                    percentPosition={{ align: "center", type: "inner" }}
                    format={() => "30/100"}
                    percent={30}
                    strokeColor={"#fde1ac"}
                  />
                </li>
                <li className="min-h-[5rem] max-h-[7.5rem] bg-[#fafafc] p-2 flex-col flex justify-between shadow-md rounded-xl col-span-6 ">
                  <h1>Lop SE1834</h1>
                  <Progress
                    strokeWidth={24}
                    className="[&_.ant-progress-inner]:rounded-md [&_.ant-progress-inner]:w-[7.5rem]"
                    percentPosition={{ align: "center", type: "inner" }}
                    format={() => "30/100"}
                    percent={30}
                    strokeColor={"#fde1ac"}
                  />
                </li>
                <li className="min-h-[5rem] max-h-[7.5rem] bg-[#fafafc] p-2 flex-col flex justify-between shadow-md rounded-xl col-span-6 ">
                  <h1>Lop SE1834</h1>
                  <Progress
                    strokeWidth={24}
                    className="[&_.ant-progress-inner]:rounded-md [&_.ant-progress-inner]:w-[7.5rem]"
                    percentPosition={{ align: "center", type: "inner" }}
                    format={() => "30/100"}
                    percent={30}
                    strokeColor={"#fde1ac"}
                  />
                </li>
                <li className="min-h-[5rem] max-h-[7.5rem] bg-[#fafafc] p-2 flex justify-center items-center border-2 border-dashed border-[#a3a3a3] rounded-xl col-span-6 ">
                  <Button icon={<Bandaids size={18} />}>Xem thêm</Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-4 my-2">
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
          </div>
          <div></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Landing;
