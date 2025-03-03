import type { TableProps } from "antd";
import { Button, Space, Table, Modal } from "antd";

import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../utils/api";

interface DataType {
  key: string;
  name: string;
  description: string;
  code: string;
  status: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Tên khóa học",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Mã",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary">Sửa</Button>
        <Button type="primary" danger>Xóa</Button>
      </Space>
    ),
  },
];



function CourseList() {

  const  [courseList, setCourseList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCourses = async () => {
    const courses = await getAllCourses();
    setCourseList(courses?.course);
  }
  useEffect(() => {
    fetchCourses();
  }, [])

  const data: DataType[] = courseList?.map((course: any) => {
    return {
      key: course._id,
      name: course.courseName,
      description: course.description,
      code: course.courseCode,
      status: course.status,
    }
  })
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
  return (
    <DashboardLayout>
      <h1 className="text-[40px] ">Danh sách khóa học</h1>

      <Button type="primary" onClick={showModal} className="my-[20px] float-right">
        Thêm
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Table<DataType> columns={columns} dataSource={data} />
    </DashboardLayout>
  );
}

export default CourseList;
