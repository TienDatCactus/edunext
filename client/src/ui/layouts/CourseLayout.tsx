import { PencilSimpleLine } from "@phosphor-icons/react";
import { Calendar, Divider, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import { CourseLayoutProps } from "../../utils/interfaces";

const { Paragraph } = Typography;

const CourseLayout: React.FC<React.PropsWithChildren<CourseLayoutProps>> = ({
  children,
  id,
  code,
  name,
  instructor,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 py-6 bg-white px-14 *:border *:border-[#ccc] *:rounded-lg *:shadow-md *:min-h-[500px]">
      <div className="col-span-8">{children}</div>
      <div className="col-span-4 max-h-[650px]  animate-lightSpeedInRight">
        <div className="px-6 py-4">
          <div>
            <Tag color="#d6edff" className="text-black code">
              #{id}
            </Tag>
            <Tag color="#d3f8e3" className="text-black  code">
              #{code}
            </Tag>
          </div>
          <div className="pt-3">
            <Paragraph
              className="text-[20px] code font-medium flex items-start [&_.ant-typography-edit]:text-[#858585]"
              editable={{
                icon: <PencilSimpleLine size={20} />,
              }}
            >
              {name}
            </Paragraph>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center justify-between gap-2">
                <span className="text-[#878787] w-1/3">Giáo viên</span>
                <span className="w-1/12">:</span>
                <p className="w-1/2">{instructor} </p>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-[#878787] w-1/3">Phương thức</span>
                <span className="w-1/12">:</span>
                <p className="w-1/2">Online</p>
              </li>
            </ul>
          </div>
        </div>
        <Divider className="border-[#ccc] mb-0" />
        <div className="px-6 pb-4">
          <Calendar fullscreen={false} defaultValue={dayjs()} />
          <p className="text-[12px] text-[#717171]">
            *Calendar view with scheduled dates
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;
