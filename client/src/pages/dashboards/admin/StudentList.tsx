import { CalendarDots } from "@phosphor-icons/react/dist/ssr";
import { Button, Col, Row, Table } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import dayjs from "dayjs";
import { Moon, Sun } from "phosphor-react";
import React from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { title } from "process";
const StudentList: React.FC = () => {
  const hours = dayjs().hour();
  const isDayTime = hours > 6 && hours < 20;
  console.log(isDayTime);
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-lg">
        <div>
          <h1 className="text-[2.5rem]">Danh sách học sinh</h1>
          <div className="flex items-center gap-2">
            <CalendarDots size={22} />
            <span className="text-[#727272]">
              Hôm nay: {dayjs().format("dddd - MMMM - YYYY")}
            </span>
          </div>
        </div>
        <ButtonGroup>
          <Button
            className={`${isDayTime && "bg-[#ffebc7]"} w-12`}
            icon={<Sun color={`${isDayTime ? "#ffb700" : "#000"} `} />}
          />
          <Button
            className={`${!isDayTime && "text-white bg-[#2C3E50]"}  w-12`}
            icon={<Moon />}
          />
        </ButtonGroup>
      </div>
      <Row className="p-2 my-2 bg-white rounded-lg shadow-md" gutter={[6, 16]}>
        <Col span={12}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
        <Col span={12}></Col>
      </Row>
    </DashboardLayout>
  );
};

export default StudentList;
