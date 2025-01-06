import { DotsThreeVertical } from "@phosphor-icons/react";
import { Badge, Breadcrumb, Button, Tag } from "antd";
import React from "react";

const Group: React.FC = () => {
  return (
    <div>
      <Breadcrumb
        className="px-4 py-2 bg-white border rounded-md shadow-md"
        items={[
          {
            key: "1",
            title: "Group 6",
            href: "/course",
          },
          {
            key: "2",
            title: "6 Students",
          },
        ]}
      />
      <ul className="w-[100%] mx-auto my-2 flex flex-col gap-4">
        <li className="flex justify-between px-4 py-2 border rounded-md shadow-md">
          <div className="flex flex-col gap-2">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src="https://ui-avatars.com/api/?background=random"
                  alt="ava"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="font-semibold text-[16px]">Nguyen Tien Dat</h1>
                  <span className="text-[12px]">#HE180012</span>
                </div>
              </div>
              <p></p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 *:border-none">
                <Tag>Frontend</Tag>
                <Tag>HE</Tag>
                <Tag>Nigger</Tag>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#5f6c76]">
                <p>Joined: 20/10/2021</p>
                <Badge color="#5f6c76" />
                <p>Role: Student</p>
              </div>
            </div>
          </div>
          <Button icon={<DotsThreeVertical size={22} />} />
        </li>
        <li className="flex justify-between px-4 py-2 border rounded-md shadow-md">
          <div className="flex flex-col gap-2">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src="https://ui-avatars.com/api/?background=random"
                  alt="ava"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="font-semibold text-[16px]">Nguyen Tien Dat</h1>
                  <span className="text-[12px]">#HE180012</span>
                </div>
              </div>
              <p></p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 *:border-none">
                <Tag>Frontend</Tag>
                <Tag>HE</Tag>
                <Tag>Nigger</Tag>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#5f6c76]">
                <p>Joined: 20/10/2021</p>
                <Badge color="#5f6c76" />
                <p>Role: Student</p>
              </div>
            </div>
          </div>
          <Button icon={<DotsThreeVertical size={22} />} />
        </li>
        <li className="flex justify-between px-4 py-2 border rounded-md shadow-md">
          <div className="flex flex-col gap-2">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src="https://ui-avatars.com/api/?background=random"
                  alt="ava"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="font-semibold text-[16px]">Nguyen Tien Dat</h1>
                  <span className="text-[12px]">#HE180012</span>
                </div>
              </div>
              <p></p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 *:border-none">
                <Tag>Frontend</Tag>
                <Tag>HE</Tag>
                <Tag>Nigger</Tag>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#5f6c76]">
                <p>Joined: 20/10/2021</p>
                <Badge color="#5f6c76" />
                <p>Role: Student</p>
              </div>
            </div>
          </div>
          <Button icon={<DotsThreeVertical size={22} />} />
        </li>
      </ul>
    </div>
  );
};

export default Group;
