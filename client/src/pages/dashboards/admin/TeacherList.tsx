import { CalendarDots, Plus } from "@phosphor-icons/react/dist/ssr";
import {
  Button,
  Col,
  Row,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Space,
  Card,
  Divider,
  Upload,
  Switch,
  Dropdown,
  Menu,
  Tooltip,
  Tabs,
  List,
  Badge,
} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import dayjs from "dayjs";
import {
  Moon,
  Sun,
  UserPlus,
  Users,
  Key,
  Download,
  Upload as UploadIcon,
  Pencil,
  Trash,
  Power,
  DotsThreeVertical,
  BookOpen,
  ChalkboardTeacher,
  GraduationCap,
} from "phosphor-react";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { getAllUsers } from "../../../utils/api";
import { User, CourseItem } from "../../../utils/interfaces";
import { useUserStore } from "../../../utils/zustand/Store";

interface TeacherFormData {
  name: string;
  email: string;
  feid: string;
  major: string;
  forcePasswordReset?: boolean;
  isActive?: boolean;
}

interface ClassData {
  key: string;
  name: string;
  students: string[];
  courseId: string;
  teacherId: string;
}

const TeacherList = (): JSX.Element => {
  const hours = dayjs().hour();
  const isDayTime = hours > 6 && hours < 20;
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const { user } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClassModalVisible, setIsClassModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [form] = Form.useForm();
  const [classForm] = Form.useForm();
  const [editingTeacher, setEditingTeacher] = useState<TeacherFormData | null>(
    null
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const getUsers = async () => {
    try {
      setLoading(true);
      const resp = await getAllUsers();
      if (resp) {
        // Filter teachers and students
        setTeachers(resp.users.filter((u: User) => u.role == "2"));
        setStudents(resp.users.filter((u: User) => u.role == "1"));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role == "3") {
      getUsers();
    }
  }, [user]);

  const handlePasswordReset = async (teacherId: string) => {
    try {
      // TODO: Implement password reset API call
      message.success("Password has been reset successfully");
    } catch (error) {
      message.error("Failed to reset password");
    }
  };

  const handleCreateTeacher = async (values: any) => {
    try {
      // TODO: Implement create teacher API call
      message.success("Teacher created successfully");
      setIsModalVisible(false);
      form.resetFields();
      getUsers();
    } catch (error) {
      message.error("Failed to create teacher");
    }
  };

  const handleCreateClass = async (values: any) => {
    try {
      const newClass: ClassData = {
        key: Math.random().toString(36).substr(2, 9),
        name: values.className,
        students: [],
        courseId: values.courseId,
        teacherId: selectedTeacher?._id || "",
      };
      setClasses([...classes, newClass]);
      message.success("Class created successfully");
      setIsClassModalVisible(false);
      classForm.resetFields();
    } catch (error) {
      message.error("Failed to create class");
    }
  };

  const handleEditTeacher = async (values: TeacherFormData) => {
    try {
      // TODO: Implement edit teacher API call
      message.success("Teacher updated successfully");
      setIsModalVisible(false);
      form.resetFields();
      setEditingTeacher(null);
      getUsers();
    } catch (error) {
      message.error("Failed to update teacher");
    }
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    try {
      // TODO: Implement delete teacher API call
      message.success("Teacher deleted successfully");
      getUsers();
    } catch (error) {
      message.error("Failed to delete teacher");
    }
  };

  const handleToggleActive = async (teacherId: string, active: boolean) => {
    try {
      // TODO: Implement toggle active API call
      message.success(
        `Account ${active ? "activated" : "deactivated"} successfully`
      );
      getUsers();
    } catch (error) {
      message.error("Failed to update account status");
    }
  };

  const handleBulkDelete = async () => {
    try {
      // TODO: Implement bulk delete API call
      message.success("Selected teachers deleted successfully");
      setSelectedRowKeys([]);
      getUsers();
    } catch (error) {
      message.error("Failed to delete teachers");
    }
  };

  const handleExport = () => {
    const data = teachers.map((teacher) => ({
      Name: teacher.name,
      Email: teacher.email,
      "Teacher ID": teacher.FEID,
      Major: teacher.major,
      Status: teacher.isActive ? "Active" : "Inactive",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teachers");
    XLSX.writeFile(wb, `teachers_${dayjs().format("YYYY-MM-DD")}.xlsx`);
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".xlsx,.xls,.csv",
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          // TODO: Implement bulk import API call
          message.success(`${jsonData.length} teachers imported successfully`);
          setImportModalVisible(false);
          getUsers();
        };
        reader.readAsArrayBuffer(file as Blob);
        onSuccess?.("ok");
      } catch (error) {
        onError?.(error as Error);
        message.error("Failed to import teachers");
      }
    },
  };

  const dataSource = teachers?.map((teacher) => ({
    key: teacher._id,
    email: teacher.email,
    name: teacher.name,
    feid: teacher.FEID,
    role: "Giáo viên",
    major: teacher.major,
    isActive: teacher.isActive,
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
      key: "email",
    },
    {
      title: "Mã giáo viên",
      dataIndex: "feid",
      key: "feid",
      render: (text: string) => (
        <Tag className="code" color="blue">
          #{text}
        </Tag>
      ),
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
      render: (text: string) => (
        <Tag className="code" color={text === "IT" ? "blue" : "green"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active: boolean, record: any) => (
        <Switch
          checked={active}
          onChange={(checked) => handleToggleActive(record.key, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  icon: <Pencil />,
                  label: "Edit",
                  onClick: () => {
                    setEditingTeacher(record);
                    setIsModalVisible(true);
                  },
                },
                {
                  key: "2",
                  icon: <Key />,
                  label: "Reset Password",
                  onClick: () => handlePasswordReset(record.key),
                },
                {
                  key: "3",
                  icon: <BookOpen />,
                  label: "Manage Courses",
                  onClick: () => {
                    setSelectedTeacher(record);
                    setActiveTab("2");
                  },
                },
                {
                  key: "4",
                  icon: <Trash />,
                  label: "Delete",
                  danger: true,
                  onClick: () => handleDeleteTeacher(record.key),
                },
              ],
            }}
          >
            <Button icon={<DotsThreeVertical />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const items = [
    {
      key: "1",
      label: "Danh sách giáo viên",
      icon: <Users />,
      children: (
        <div>
          <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-lg mb-4">
            <div>
              <h1 className="text-[2.125rem] font-semibold">
                Danh sách giáo viên
              </h1>
              <div className="flex items-center gap-1">
                <CalendarDots size={18} />
                <span className="text-[#727272] text-[14px]">
                  Hôm nay: {dayjs().format("dddd - MMMM/YYYY")}
                </span>
              </div>
            </div>
            <Space>
              <Button
                type="primary"
                icon={<UserPlus />}
                onClick={() => {
                  setEditingTeacher(null);
                  setIsModalVisible(true);
                }}
              >
                Thêm giáo viên
              </Button>
              <Button
                icon={<UploadIcon />}
                onClick={() => setImportModalVisible(true)}
              >
                Import
              </Button>
              <Button icon={<Download />} onClick={handleExport}>
                Export
              </Button>
              {selectedRowKeys.length > 0 && (
                <Popconfirm
                  title={`Delete ${selectedRowKeys.length} selected teachers?`}
                  onConfirm={handleBulkDelete}
                >
                  <Button danger icon={<Trash />}>
                    Delete Selected
                  </Button>
                </Popconfirm>
              )}
              <ButtonGroup>
                <Button
                  className={isDayTime ? "bg-[#ffebc7] w-12" : "w-12"}
                  icon={<Sun color={isDayTime ? "#ffb700" : "#000"} />}
                />
                <Button
                  className={
                    !isDayTime ? "text-white bg-[#2C3E50] w-12" : "w-12"
                  }
                  icon={<Moon />}
                />
              </ButtonGroup>
            </Space>
          </div>
          <Table
            rowSelection={rowSelection}
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Quản lý khóa học",
      icon: <BookOpen />,
      children: selectedTeacher ? (
        <div>
          <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-lg mb-4">
            <div>
              <h1 className="text-[2.125rem] font-semibold">
                Khóa học của {selectedTeacher.name}
              </h1>
              <div className="flex items-center gap-1">
                <ChalkboardTeacher size={18} />
                <span className="text-[#727272] text-[14px]">
                  {selectedTeacher.email}
                </span>
              </div>
            </div>
            <Space>
              <Button
                type="primary"
                icon={<Plus />}
                onClick={() => setIsClassModalVisible(true)}
              >
                Thêm lớp học
              </Button>
            </Space>
          </div>
          <Row gutter={[16, 16]}>
            {classes
              .filter((c) => c.teacherId === selectedTeacher._id)
              .map((classData) => (
                <Col span={8} key={classData.key}>
                  <Card
                    title={classData.name}
                    extra={
                      <Space>
                        <Button icon={<Pencil />} />
                        <Button danger icon={<Trash />} />
                      </Space>
                    }
                  >
                    <p>Số học sinh: {classData.students.length}</p>
                    <p>
                      Khóa học:{" "}
                      {
                        courses.find((c) => c._id === classData.courseId)
                          ?.courseName
                      }
                    </p>
                    <Divider />
                    <List
                      size="small"
                      dataSource={classData.students}
                      renderItem={(studentId) => (
                        <List.Item>
                          {students.find((s) => s._id === studentId)?.name}
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      ) : (
        <div className="text-center p-8">
          <GraduationCap size={48} className="mx-auto mb-4" />
          <p className="text-lg">Vui lòng chọn một giáo viên để xem khóa học</p>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        className="bg-white rounded-lg shadow-lg p-4"
      />

      {/* Teacher Modal */}
      <Modal
        title={editingTeacher ? "Edit Teacher" : "Add New Teacher"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTeacher(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editingTeacher ? handleEditTeacher : handleCreateTeacher}
          layout="vertical"
          initialValues={editingTeacher || {}}
        >
          <Form.Item
            name="name"
            label="Tên giáo viên"
            rules={[{ required: true, message: "Please input teacher name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please input valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="feid"
            label="Mã giáo viên"
            rules={[{ required: true, message: "Please input teacher ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="major"
            label="Chuyên ngành"
            rules={[{ required: true, message: "Please select major!" }]}
          >
            <Select>
              <Select.Option value="IT">IT</Select.Option>
              <Select.Option value="MKT">Marketing</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="forcePasswordReset" valuePropName="checked">
            <Switch
              checkedChildren="Force password reset on next login"
              unCheckedChildren="No password reset required"
            />
          </Form.Item>
          <Form.Item name="isActive" valuePropName="checked">
            <Switch
              checkedChildren="Account active"
              unCheckedChildren="Account inactive"
              defaultChecked
            />
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingTeacher(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingTeacher ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Import Modal */}
      <Modal
        title="Import Teachers"
        open={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        footer={null}
      >
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for single Excel or CSV file upload. Please ensure your file
            has the correct format.
          </p>
        </Upload.Dragger>
        <div className="mt-4">
          <Button
            type="link"
            onClick={() => {
              const template = [
                {
                  Name: "",
                  Email: "",
                  "Teacher ID": "",
                  Major: "IT/MKT",
                  "Force Password Reset": "Yes/No",
                  Active: "Yes/No",
                },
              ];
              const ws = XLSX.utils.json_to_sheet(template);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Template");
              XLSX.writeFile(wb, "teacher_import_template.xlsx");
            }}
          >
            Download template
          </Button>
        </div>
      </Modal>

      {/* Create Class Modal */}
      <Modal
        title="Tạo lớp học mới"
        open={isClassModalVisible}
        onCancel={() => setIsClassModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={classForm} onFinish={handleCreateClass} layout="vertical">
          <Form.Item
            name="className"
            label="Tên lớp"
            rules={[{ required: true, message: "Please input class name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="courseId"
            label="Khóa học"
            rules={[{ required: true, message: "Please select course!" }]}
          >
            <Select>
              {courses.map((course) => (
                <Select.Option key={course._id} value={course._id}>
                  {course.courseName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={() => setIsClassModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Class
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default TeacherList;
