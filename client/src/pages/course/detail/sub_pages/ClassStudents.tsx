import { ArrowRight, DotsThreeVertical } from "@phosphor-icons/react";
import { Button, Divider, Segmented, Tag } from "antd";

const ClassStudents = () => {
  return (
    <>
      <div className="border-b border-[#ccc]">
        <div className="px-8 py-4 ">
          <h1 className="text-[22px] font-semibold">Class's Students</h1>
          <div className="pt-2">
            <Segmented<string>
              defaultValue="All"
              options={["All", "Active", "Inactive"]}
            />
          </div>
        </div>
      </div>
      <div className="px-8 pt-4">
        <div className="flex flex-col gap-3">
          <p>
            <Tag color="#d3f8e3" className="text-[14px] text-black ">
              Số lượng học sinh Online
            </Tag>
            :{" "}
            <Tag color="#bae5f5" className="text-[16px] text-black">
              10
            </Tag>
          </p>
          <p>
            <Tag color="#fde1ac" className="text-[14px] text-black ">
              Tổng số học sinh :
            </Tag>
            <Tag color="#bae5f5" className="text-[16px] text-black">
              20
            </Tag>
          </p>
        </div>
      </div>
      <Divider className="border-[#ccc]" />
      <div className="px-8 ">
        <ul className="flex flex-wrap gap-6 justify-evenly">
          <li className="grid grid-cols-12 min-w-[300px] border border-[#ccc] rounded-xl p-4 hover:border-blue-500  hover:bg-[#f9f9f9] ease-in-out cursor-pointer shadow-md">
            <div className="flex flex-col col-span-6 gap-3">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="text-[16px] font-semibold">Ten hoc sinh</h1>
                <p className="text-[12px] text-[#767a85]">Roll number</p>
              </div>
            </div>
            <div className="grid justify-end col-span-6 gird-rows-2">
              <div className="flex items-start ">
                <Button
                  icon={<DotsThreeVertical size={20} />}
                  className="border-none"
                />
              </div>
              <div className="flex items-end">
                <Button icon={<ArrowRight size={20} />} className="shadow-md" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ClassStudents;
