import { FunnelSimple } from "@phosphor-icons/react";
import { Button, Calendar, Col, Dropdown, MenuProps, Row } from "antd";
import dayjs from "dayjs";
import { useUserStore } from "../../../../utils/zustand/Store";
import ListItem from "./sub_elements/ListItem";

const TimeTable = () => {
  const { user } = useUserStore();
  console.log(user?.timetable);
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
      <Row className="my-2 ">
        <Col span={12} className="flex flex-col gap-4 py-4">
          {!!user?.timetable?.length &&
            user?.timetable?.map((t, index) => (
              <div>
                <h1 className="text-[20px] font-medium">
                  Ngày : {dayjs(t?.timeline?.time).format("DD-MM-YYYY")}
                </h1>
                <ul className="flex flex-col gap-4 py-2">
                  <ListItem
                    prop={{
                      type: t?.timeline?.type,
                      content: t?.timeline?.content,
                      time: t?.timeline?.time,
                    }}
                  />
                </ul>
              </div>
            ))}
        </Col>
        <Col span={12} className="border rounded-md shadow-md">
          <Calendar fullscreen={false} />
        </Col>
      </Row>
    </div>
  );
};

export default TimeTable;
