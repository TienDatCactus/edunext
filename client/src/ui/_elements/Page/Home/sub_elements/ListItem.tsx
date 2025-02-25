import {
  ChartPieSlice,
  FileJs,
  Notebook,
  SelectionPlus,
} from "@phosphor-icons/react";
import { Badge, Button, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";

const ListItem: React.FC<{
  prop: {
    type: string;
    content: string;
    time: string;
  };
}> = ({ prop }) => {
  return (
    <li className="">
      <div className="flex items-center ">
        <p className="text-[12px] text-[#9b9ba0]">
          {dayjs(prop?.time).format("HH:mm A")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-start gap-2">
            <h1 className="font-semibold text-[16px]">{prop?.content}</h1>
            <div className="flex items-center gap-2 text-[12px] text-[#575757]">
              <Tag
                color={
                  prop?.type == "important"
                    ? "red"
                    : prop?.type == "note"
                    ? "blue"
                    : prop?.type == "warning"
                    ? "yellow"
                    : ""
                }
              >
                {prop?.type == "important"
                  ? "Quan trọng"
                  : prop?.type == "note"
                  ? "Ghi nhớ"
                  : prop?.type == "warning"
                  ? "Cần làm"
                  : ""}
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <Button type="dashed" icon={<SelectionPlus />} />
    </li>
  );
};

export default ListItem;
