import React, { useState } from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { ArrowsOutSimple, Notebook } from "@phosphor-icons/react";
import { Tag } from "antd";
const Landing: React.FC = () => {
  const [selected, setSelected] = useState<string>("");
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 ">
        <div className="col-span-9 ">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 p-4 bg-white border shadow-md rounded-2xl">
              <div className="flex items-center justify-between ">
                <h1 className="font-bold text-[1.625rem]">Theo dõi môn học</h1>
                <div className="p-2 border rounded-full cursor-pointer">
                  <ArrowsOutSimple size={18} />
                </div>
              </div>
              <ul className="my-4">
                <li className="bg-[#1890ff] *:text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <Tag>tag o day</Tag>
                      <h1>Ten mon hoc</h1>
                    </div>
                    <div className="p-2 border rounded-full ">
                      <Notebook size={20} />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-span-6"></div>
          </div>
        </div>
        <div className="col-span-3">
          <div></div>
          <div></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Landing;
