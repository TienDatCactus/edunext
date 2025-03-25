"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  message,
  Card,
  Space,
  Tag,
  Typography,
  Input,
  DatePicker,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

interface Course {
  _id: string;
  courseName: string;
  courseCode: string;
  description: string;
  forMajor: string;
}

interface Semester {
  _id: string;
  semesterName: string;
  year: string;
  courses: Course[];
  startDate: string;
  endDate: string;
}

const SemesterList: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(
    null
  );
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [semestersRes, coursesRes] = await Promise.all([
        axios.get("/api/dashboard/semesters"),
        axios.get("/api/dashboard/available-courses"),
      ]);
      setSemesters(semestersRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      message.error("Failed to fetch data");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing && selectedSemester) {
        await axios.put(`/api/dashboard/semesters/${selectedSemester._id}`, {
          ...values,
          startDate: values.startDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
        });
        message.success("Semester updated successfully");
      } else {
        await axios.post("/api/dashboard/semesters", {
          ...values,
          startDate: values.startDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
        });
        message.success("Semester created successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      message.error("Failed to save semester");
    }
  };

  const handleEdit = (semester: Semester) => {
    setSelectedSemester(semester);
    setIsEditing(true);
    form.setFieldsValue({
      ...semester,
      startDate: dayjs(semester.startDate),
      endDate: dayjs(semester.endDate),
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (semesterId: string) => {
    try {
      await axios.delete(`/api/dashboard/semesters/${semesterId}`);
      message.success("Semester deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to delete semester");
    }
  };

  const handleAddNew = () => {
    setSelectedSemester(null);
    setIsEditing(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Semester",
      dataIndex: "semesterName",
      key: "semesterName",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Duration",
      key: "duration",
      render: (_: unknown, record: Semester) => (
        <span>
          {dayjs(record.startDate).format("MMM DD, YYYY")} -{" "}
          {dayjs(record.endDate).format("MMM DD, YYYY")}
        </span>
      ),
    },
    {
      title: "Courses",
      key: "courses",
      render: (_: unknown, record: Semester) => (
        <Space wrap>
          {record.courses.map((course) => (
            <Tag key={course._id} color="blue">
              {course.courseCode} - {course.courseName}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Semester) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title level={2}>Semester Management</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
            Add New Semester
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={semesters}
          rowKey="_id"
          pagination={false}
        />

        <Modal
          title={isEditing ? "Edit Semester" : "Add New Semester"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="semesterName"
              label="Semester Name"
              rules={[
                { required: true, message: "Please input semester name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="year"
              label="Year"
              rules={[{ required: true, message: "Please input year" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="courseIds"
              label="Select Courses"
              rules={[{ required: true, message: "Please select courses" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select courses"
                style={{ width: "100%" }}
              >
                {courses.map((course) => (
                  <Option key={course._id} value={course._id}>
                    {course.courseCode} - {course.courseName} ({course.forMajor}
                    )
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {isEditing ? "Update" : "Create"}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default SemesterList;
