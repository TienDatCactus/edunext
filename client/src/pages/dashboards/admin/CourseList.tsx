import type { TableProps } from "antd";
import { Button, Form, Input, Modal, Space, Table } from "antd";

import type { FormProps } from "antd";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { getAllCourses } from "../../../utils/api";

interface DataType {
  key: string;
  name: string;
  description: string;
  code: string;
  status: string;
}

type FieldType = {
  courseName?: String;
  description?: String;
  courseCode?: String;
  assignments?: String;
  instructor?: String;
  semester?: String;
  lessons?: String;
  forMajor?: String;
  status?: String;
};

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    courseCode: "",
    assignments: "",
    instructor: "",
    semester: "",
    lessons: "",
    forMajor: "",
    status: "",
  });

  const [form] = Form.useForm();

  const fetchCourses = async () => {
    const courses = await getAllCourses();
    setCourseList(courses?.course);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    form.setFieldsValue(course);
  }, [course]);

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
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleFillDataUpdate(record)}>
            Sửa
          </Button>
          <Button type="primary" danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = courseList?.map((course: any) => {
    return {
      key: course._id,
      name: course.courseName,
      description: course.description,
      instructor: course.instructor,
      semester: course.semester,
      lessons: course.lessons[0],
      major: course.forMajor,
      code: course.courseCode,
      status: course.status,
    };
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: any) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
  
  const handleOpenAddModal = () => {
    setCourse({
      courseName: "",
      description: "",
      courseCode: "",
      assignments: "",
      instructor: "",
      semester: "",
      lessons: "",
      forMajor: "",
      status: "",
    });
    showModal();
  }

  const handleFillDataUpdate = (course: any) => {
    setCourse({
      courseName: course?.name,
      description: course?.description,
      courseCode: course?.code,
      assignments: "",
      instructor: course?.instructor?.name,
      semester: course?.semester?.semesterName,
      lessons: course?.lessons[0],
      forMajor: course?.major,
      status: course?.status,
    });
    showModal();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <DashboardLayout>
      <h1 className="text-[40px] ">Danh sách khóa học</h1>

      <Button
        type="primary"
        onClick={handleOpenAddModal}
        className="my-[20px] float-right"
      >
        Thêm
      </Button>
      <Modal
        title="Thêm khóa học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Form
            form={form} // sử dụng form instance
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Tên khóa học"
              name="courseName"
              rules={[{ required: true, message: "Nhập tên khóa học" }]}
            >
              <Input name="courseName" onChange={handleChangeInput} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Nhập mô tả chi tiết" }]}
            >
              <Input name="description" onChange={handleChangeInput} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mã khóa học"
              name="courseCode"
              rules={[{ required: true, message: "Nhập mã khóa học" }]}
            >
              <Input name="courseCode" onChange={handleChangeInput} />
            </Form.Item>

            <Form.Item<FieldType> label="Assignments" name="assignments">
              <Input name="assignments" onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item<FieldType> label="Instructor" name="instructor">
              <Input onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item<FieldType> label="Kỳ học" name="semester">
              <Input name="semester" onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item<FieldType> label="Lessons" name="lessons">
              <Input name="lessons" onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item<FieldType> label="Status" name="status">
              <Input name="status" onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item<FieldType> label="Chuyên ngành" name="forMajor">
              <Input name="forMajor" onChange={handleChangeInput} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Table<DataType> columns={columns} dataSource={data} />
    </DashboardLayout>
  );
}

export default CourseList;
