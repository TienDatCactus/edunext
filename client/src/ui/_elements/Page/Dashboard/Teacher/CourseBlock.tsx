import { ArrowsOutSimple, CornersOut, Notebook } from "@phosphor-icons/react";
import { Button, Progress, Tag } from "antd";
import React from "react";
export const CourseBlock: React.FC = () => {
  return (
    <div className="col-span-6 p-4 bg-white border shadow-md rounded-2xl">
      <div className="flex items-center justify-between ">
        <h1 className="font-bold text-[1.625rem]">Theo dõi khóa học</h1>
        <Button shape="circle" className="border ">
          <ArrowsOutSimple size={18} />
        </Button>
      </div>
      <ul className="flex flex-col gap-2 my-4">
        <li className="bg-[#c2e8f6] p-2 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <Tag className="px-2 my-2 border-none rounded-3xl">tag o day</Tag>
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
            <Button
              shape="circle"
              className=" border border-[#4b4b4b] cursor-pointer"
            >
              <CornersOut size={18} />
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CourseBlock;
