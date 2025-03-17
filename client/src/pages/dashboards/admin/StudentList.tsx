import { CalendarDots } from "@phosphor-icons/react/dist/ssr";
import { Button, Col, Row, Table } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import dayjs from "dayjs";
import { Moon, Sun } from "phosphor-react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { title } from "process";
import { getAllUsers } from "../../../utils/api";
import { User } from "../../../utils/interfaces";
import { useUserStore } from "../../../utils/zustand/Store";
const StudentList: React.FC = () => {
  const hours = dayjs().hour();
  const isDayTime = hours > 6 && hours < 20;
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<User[]>([]);
  const { user } = useUserStore();
  const getUsers = async () => {
    try {
      setLoading(true);
      const resp = await getAllUsers();
      if (resp) {
        setStudents(resp.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      if (user?.role == "3") {
        getUsers();
      }
    };
  }, []);
  const dataSource = students?.map((student) => ({
    key: student._id,
    email: student.email,
    name: student.name,
    feid: student.FEID,
    role: student.role == "1" ? "Sinh viên" : "Giáo viên",
    major: student.forMajor == "",
  }));

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "age",
    },
    {
      title: "Mã sinh viên",
      dataIndex: "feid",
      key: "feid",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-lg">
        <div>
          <h1 className="text-[2.125rem] font-semibold">Danh sách học sinh</h1>
          <div className="flex items-center gap-1">
            <CalendarDots size={18} />
            <span className="text-[#727272] text-[14px]">
              Hôm nay: {dayjs().format("dddd - MMMM/YYYY")}
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
      <Row
        className="p-2 my-2 bg-white rounded-lg shadow-md min-h-[400px]"
        gutter={[6, 16]}
      >
        <Col span={12}>
          <Table dataSource={dataSource} loading={loading} columns={columns} />
        </Col>
        <Col span={12}></Col>
      </Row>
    </DashboardLayout>
  );
};

export default StudentList;
