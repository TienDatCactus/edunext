import { Bandaids, Play } from "@phosphor-icons/react";
import { Button, Progress } from "antd";
import dayjs from "dayjs";
import React from "react";
const ClassBlock: React.FC = () => {
  return (
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
            size={24}
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
  );
};

export default ClassBlock;
