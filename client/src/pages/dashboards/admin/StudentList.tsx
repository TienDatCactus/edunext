import { CalendarDots, Plus } from "@phosphor-icons/react/dist/ssr";
import {
  Button,
  Col,
  Row,
  Table,
  Tag,
  Transfer,
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
} from "phosphor-react";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { getAllUsers } from "../../../utils/api";
import { User } from "../../../utils/interfaces";
import { useUserStore } from "../../../utils/zustand/Store";
import type { TransferProps } from "antd";

const { Dragger } = Upload;

interface ClassData {
  key: string;
  name: string;
  students: string[];
}

interface StudentFormData {
  name: string;
  email: string;
  feid: string;
  major: string;
  forcePasswordReset?: boolean;
  isActive?: boolean;
}

const StudentList: React.FC = () => {
  const hours = dayjs().hour();
  const isDayTime = hours > 6 && hours < 20;
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<User[]>([]);
  const { user } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClassModalVisible, setIsClassModalVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [form] = Form.useForm();
  const [classForm] = Form.useForm();
  const [editingStudent, setEditingStudent] = useState<StudentFormData | null>(
    null
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [importModalVisible, setImportModalVisible] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const resp = await getAllUsers();
      if (resp) {
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
  }, []);

  const handlePasswordReset = async (studentId: string) => {
    try {
      message.success("Đặt lại mật khẩu thành công");
    } catch (error) {
      message.error("Đặt lại mật khẩu thất bại");
    }
  };

  const handleCreateStudent = async (values: any) => {
    try {
      message.success("Thêm học sinh thành công");
      setIsModalVisible(false);
      form.resetFields();
      getUsers();
    } catch (error) {
      message.error("Thêm học sinh thất bại");
    }
  };
  const handleCreateClass = async (values: any) => {
    try {
      const newClass: ClassData = {
        key: Math.random().toString(36).substr(2, 9),
        name: values.className,
        students: selectedStudents,
      };
      setClasses([...classes, newClass]);
      message.success("Tạo lớp học thành công");
      setIsClassModalVisible(false);
      classForm.resetFields();
      setSelectedStudents([]);
    } catch (error) {
      message.error("Tạo lớp học thất bại");
    }
  };

  const handleTransferChange: TransferProps["onChange"] = (newTargetKeys) => {
    setSelectedStudents(newTargetKeys as string[]);
  };

  const handleEditStudent = async (values: StudentFormData) => {
    try {
      message.success("Cập nhật thành công");
      setIsModalVisible(false);
      form.resetFields();
      setEditingStudent(null);
      getUsers();
    } catch (error) {
      message.error("Cập nhật thất bại");
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      message.success("Xóa thành công");
      getUsers();
    } catch (error) {
      message.error("Xóa thất bại");
    }
  };

  const handleToggleActive = async (studentId: string, active: boolean) => {
    try {
      message.success(
        `Tài khoản đã ${active ? "kích hoạt" : "vô hiệu hóa"} thành công`
      );
      getUsers();
    } catch (error) {
      message.error("Thao tác thất bại");
    }
  };

  const handleBulkDelete = async () => {
    try {
      // TODO: Implement bulk delete API call
      message.success("Xóa học sinh đã chọn thành công");
      setSelectedRowKeys([]);
      getUsers();
    } catch (error) {
      message.error("Xóa học sinh đã chọn thất bại");
    }
  };

  const handleExport = () => {
    const data = students.map((student) => ({
      Name: student.name,
      Email: student.email,
      "Student ID": student.FEID,
      Major: student.major,
      Role: student.role === "1" ? "Student" : "Teacher",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, `students_${dayjs().format("YYYY-MM-DD")}.xlsx`);
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

          message.success(
            `${jsonData.length} học sinh đã được nhập thành công`
          );
          setImportModalVisible(false);
          getUsers();
        };
        reader.readAsArrayBuffer(file as Blob);
        onSuccess?.("ok");
      } catch (error) {
        onError?.(error as Error);
        message.error("Nhập học sinh thất bại");
      }
    },
  };

  const dataSource = students?.map((student) => ({
    key: student._id,
    email: student.email,
    name: student.name,
    feid: student.FEID,
    role: student.role == "1" ? "Sinh viên" : "Giáo viên",
    major: student.major,
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
      title: "Mã sinh viên",
      dataIndex: "feid",
      key: "feid",
      render: (text: string) => (
        <Tag
          className="code"
          color={text === "IT" ? "blue" : text === "MKT" ? "green" : "default"}
        >
          #{text}
        </Tag>
      ),
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
      render: (text: string) => (
        <Tag
          className="code"
          color={text === "IT" ? "blue" : text === "MKT" ? "green" : "default"}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
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
                  label: "Chỉnh sửa",
                  onClick: () => {
                    setEditingStudent(record);
                    setIsModalVisible(true);
                  },
                },
                {
                  key: "2",
                  icon: <Key />,
                  label: "Đặt lại mật khẩu",
                  onClick: () => handlePasswordReset(record.key),
                },
                {
                  key: "3",
                  icon: <Trash />,
                  label: "Xóa",
                  danger: true,
                  onClick: () => handleDeleteStudent(record.key),
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
        <Space>
          <Button
            type="primary"
            icon={<UserPlus />}
            onClick={() => {
              setEditingStudent(null);
              setIsModalVisible(true);
            }}
          >
            Thêm học sinh
          </Button>
          <Button
            icon={<UploadIcon />}
            onClick={() => setImportModalVisible(true)}
          >
            Nhập
          </Button>
          <Button icon={<Download />} onClick={handleExport}>
            Xuất
          </Button>
          {selectedRowKeys.length > 0 && (
            <Popconfirm
              title={`Xóa ${selectedRowKeys.length} học sinh đã chọn?`}
              onConfirm={handleBulkDelete}
            >
              <Button danger icon={<Trash />}>
                Xóa đã chọn
              </Button>
            </Popconfirm>
          )}
          <Button icon={<Users />} onClick={() => setIsClassModalVisible(true)}>
            Tạo lớp học
          </Button>
          <ButtonGroup>
            <Button
              className={isDayTime ? "bg-[#ffebc7] w-12" : "w-12"}
              icon={<Sun color={isDayTime ? "#ffb700" : "#000"} />}
            />
            <Button
              className={!isDayTime ? "text-white bg-[#2C3E50] w-12" : "w-12"}
              icon={<Moon />}
            />
          </ButtonGroup>
        </Space>
      </div>

      <Row
        className="p-2 my-2 bg-white rounded-lg shadow-md min-h-[400px]"
        gutter={[6, 16]}
      >
        <Col span={18}>
          <Table
            rowSelection={rowSelection}
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </Col>
        <Col span={6}>
          <Card title="Danh sách lớp học" className="h-full">
            {classes.map((classData) => (
              <div key={classData.key} className="mb-4">
                <h3 className="font-semibold">{classData.name}</h3>
                <p className="text-gray-500">
                  {classData.students.length} học sinh
                </p>
                <Divider />
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Student Modal */}
      <Modal
        title={editingStudent ? "Chỉnh sửa học sinh" : "Thêm học sinh mới"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingStudent(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editingStudent ? handleEditStudent : handleCreateStudent}
          layout="vertical"
          initialValues={editingStudent || {}}
        >
          <Form.Item
            name="name"
            label="Tên học sinh"
            rules={[{ required: true, message: "Vui lòng nhập tên học sinh!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Vui lòng nhập email hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="feid"
            label="Mã sinh viên"
            rules={[{ required: true, message: "Vui lòng nhập mã sinh viên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="major"
            label="Chuyên ngành"
            rules={[{ required: true, message: "Vui lòng chọn chuyên ngành!" }]}
          >
            <Select>
              <Select.Option value="IT">IT</Select.Option>
              <Select.Option value="MKT">Marketing</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="forcePasswordReset" valuePropName="checked">
            <Switch
              checkedChildren="Bắt buộc đặt lại mật khẩu lần đăng nhập tiếp theo"
              unCheckedChildren="Không yêu cầu đặt lại mật khẩu"
            />
          </Form.Item>
          <Form.Item name="isActive" valuePropName="checked">
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              defaultChecked
            />
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingStudent(null);
                  form.resetFields();
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                {editingStudent ? "Cập nhật" : "Tạo mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Import Modal */}
      <Modal
        title="Nhập học sinh"
        open={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        footer={null}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Nhấp hoặc kéo tệp vào khu vực này để tải lên
          </p>
          <p className="ant-upload-hint">
            Hỗ trợ tải lên một tệp Excel hoặc CSV duy nhất. Vui lòng đảm bảo tệp
            của bạn có định dạng chính xác.
          </p>
        </Dragger>
        <div className="mt-4">
          <Button
            type="link"
            onClick={() => {
              // Generate template for download
              const template = [
                {
                  Name: "",
                  Email: "",
                  "Student ID": "",
                  Major: "IT/MKT",
                  "Force Password Reset": "Yes/No",
                  Active: "Yes/No",
                },
              ];
              const ws = XLSX.utils.json_to_sheet(template);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Template");
              XLSX.writeFile(wb, "student_import_template.xlsx");
            }}
          >
            Tải xuống mẫu
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
            rules={[{ required: true, message: "Vui lòng nhập tên lớp!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Chọn học sinh">
            <Transfer
              dataSource={students.map((s) => ({
                key: s._id,
                title: s.name,
                description: s.email,
              }))}
              titles={["Danh sách học sinh", "Học sinh đã chọn"]}
              targetKeys={selectedStudents}
              onChange={handleTransferChange}
              render={(item) => item.title}
              listStyle={{
                width: 300,
                height: 300,
              }}
            />
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={() => setIsClassModalVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                Tạo lớp
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default StudentList;
