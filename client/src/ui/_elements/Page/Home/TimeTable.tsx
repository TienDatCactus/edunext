import { FunnelSimple } from "@phosphor-icons/react";
import { Button, Dropdown, MenuProps } from "antd";
import ListItem from "./sub_elements/ListItem";
import dayjs from "dayjs";

const TimeTable = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Ngày mai
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Ngày kia
        </a>
      ),
    },
  ];
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-[30px] font-semibold">Thời khóa biểu</h1>
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <Button
            icon={<FunnelSimple size={22} className="mb-1" />}
            className="px-8 py-6 border-none bg-[#f7f7f7] rounded-none text-[16px] font-semibold"
          >
            Hôm nay
          </Button>
        </Dropdown>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <div>
          <h1 className="text-[20px] font-medium">
            Hôm nay : {dayjs().format("DD-MM-YYYY")}
          </h1>
          <ul className="flex flex-col gap-4 py-4">
            <ListItem />
            <ListItem />
          </ul>
        </div>
        <div>
          <h1 className="text-[20px] font-medium">Today 20.12</h1>
          <ul className="flex flex-col gap-4 py-4">
            <ListItem />
            <ListItem />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
