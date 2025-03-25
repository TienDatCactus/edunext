import type { TableProps } from "antd";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";

import { Bell } from "@phosphor-icons/react/dist/ssr";
import type { FormProps } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { FadersHorizontal, FunnelSimple, Plus } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import {
  addCourse,
  deleteCourse,
  editCourse,
  getAllAssignment,
  getAllCourses,
  getAllLessons,
  getAllSemester,
  getAllUsers,
  logout,
} from "../../../utils/api";
import { CourseItem, LessonItem, User } from "../../../utils/interfaces";
import { useUserStore } from "../../../utils/zustand/Store";

type FieldType = {
  courseId?: string;
  courseName: string;
  description: string;
  courseCode: string;
  assignments: string[];
  instructor: string;
  semester: string;
  lessons: string[];
  forMajor: string;
  status: string;
};

const { Title } = Typography;

function CourseList() {
  const [courseList, setCourseList] = useState<CourseItem[]>([]);
  const [lessonList, setLessonList] = useState([]);
  const [assignmentList, setAssignmentList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [course, setCourse] = useState<CourseItem>();
  console.log(course);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [courses, lessons, assignments, users, semesters] =
        await Promise.all([
          getAllCourses(),
          getAllLessons(),
          getAllAssignment(),
          getAllUsers(),
          getAllSemester(),
        ]);

      if (courses?.course) setCourseList(courses?.course);
      if (lessons?.lessons) setLessonList(lessons?.lessons);
      if (assignments?.assignment) setAssignmentList(assignments.assignment);
      if (users?.users)
        setUserList(users.users.filter((user: any) => user.role == "2"));
      if (semesters?.semester) setSemesterList(semesters.semester);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    form.setFieldsValue(course);
  }, [course, form]);

  const columns: TableProps<CourseItem>["columns"] = [
    {
      title: "Tên khóa học",
      dataIndex: "courseName",
      key: "courseName",
      render: (text) => <p>{text}</p>,
      // sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
      // filteredValue: [searchText],
      // onFilter: (value: boolean | Key, record: DataType) => {
      //   return (
      //     record.name.toLowerCase().includes(value.toString().toLowerCase()) ||
      //     record.code.toLowerCase().includes(value.toString().toLowerCase()) ||
      //     record.description
      //       ?.toLowerCase()
      //       .includes(value.toString().toLowerCase())
      //   );
      // },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Mã",
      dataIndex: "courseCode",
      key: "courseCode",
      render: (text) => (
        <Tag className="quick-sand" color="blue">
          #{text}
        </Tag>
      ),
    },
    {
      title: "Giảng viên",
      dataIndex: "instructor",
      key: "instructor",
      render: (text) => <p className="quick-sand">{text?.name}</p>,
    },
    {
      title: "Kỳ học",
      dataIndex: "semester",
      key: "semester",
      render: (text) => (
        <Tag className="quick-sand" color="yellow">
          #{text?.semesterName}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag className="quick-sand" color={text === "active" ? "green" : "red"}>
          {text === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
      filters: [
        { text: "Hoạt động", value: "active" },
        { text: "Không hoạt động", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" onClick={() => handleFillDataUpdate(record)}>
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleSubmit = async (values: FieldType) => {
    try {
      setSubmitting(true);
      if (isUpdate) {
        if (!course?._id) {
          message.error("ID khóa học không hợp lệ");
          return;
        }
        const res = await editCourse(course._id, values);
        if (res) {
          message.success("Cập nhật khóa học thành công");
          fetchData();
          setIsModalOpen(false);
        }
      } else {
        const res = await addCourse(values);
        if (res) {
          message.success("Thêm khóa học thành công");
          fetchData();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error submitting course:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (record: CourseItem) => {
    try {
      const confirmed = Modal.confirm({
        title: "Xác nhận xóa khóa học",
        content: `Bạn có chắc chắn muốn xóa khóa học "${record.courseName}" không?`,
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
      });

      if (confirmed) {
        const res = await deleteCourse(record._id || "");
        if (res) {
          message.success("Xóa khóa học thành công");
          fetchData();
        }
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      message.error("Có lỗi xảy ra khi xóa khóa học");
    }
  };

  const handleFillDataUpdate = (record: CourseItem) => {
    setIsUpdate(true);
    setCourse({
      _id: record._id,
      courseName: record.courseName,
      description: record.description,
      courseCode: record.courseCode,
      assignments: record.assignments,
      instructor: record.instructor,
      lessons:
        record.lessons?.map((lesson: LessonItem) => ({
          _id: lesson._id,
          courseCode: lesson.courseCode,
          courseName: lesson.courseName,
          questions: lesson.questions || [],
          title: lesson.title,
          content: lesson.content,
          deadline: lesson.deadline,
          course: lesson.course,
          tag: lesson.tag,
          lessonGroups: lesson.lessonGroups || [],
          question: lesson.question || [],
        })) || [],
      forMajor: record.forMajor,
      status: record.status,
    });
    setIsModalOpen(true);
  };

  const { user } = useUserStore();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between p-4 my-2 bg-white rounded-lg shadow-md">
        <Title level={2} className="!mb-0">
          Quản lý khóa học
        </Title>
        <div className="flex items-center gap-4">
          <Input.Search
            placeholder="Tìm kiếm khóa học..."
            allowClear
            className="w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Bell size={24} className="cursor-pointer" />
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<AccountMenu user={user} />}
            trigger="click"
            placement="bottomRight"
          >
            <img
              loading="lazy"
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.FEID}`}
              alt="avatar"
              className="w-8 h-8 bg-white rounded-full border-[#ccc] shadow-md cursor-pointer active:shadow-none"
            />
          </Popover>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-[#d9d9d9]">
        <div className="flex items-center justify-between px-4 py-2 my-2">
          <div>
            <Title level={4} className="!mb-0">
              Danh sách khóa học
            </Title>
            <span className="flex items-baseline gap-1">
              <Typography.Text>Tổng số:</Typography.Text>
              <Typography.Text strong>
                {courseList?.length || 0}
              </Typography.Text>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ButtonGroup>
              <Button icon={<FunnelSimple size={20} />}>Sắp xếp</Button>
              <Button icon={<FadersHorizontal size={20} />} type="primary">
                Lọc
              </Button>
            </ButtonGroup>
            <Button
              type="primary"
              icon={<Plus />}
              onClick={() => {
                setIsUpdate(false);
                form.resetFields();
                setIsModalOpen(true);
              }}
            >
              Thêm khóa học
            </Button>
          </div>
        </div>

        <Table<CourseItem>
          columns={columns}
          dataSource={courseList}
          loading={loading}
          className="[&_.ant-table-thead_.ant-table-cell]:bg-[#f8f8f8] [&_.ant-table-tbody]:bg-[#fff]"
        />
      </div>

      <Modal
        title={isUpdate ? "Cập nhật khóa học" : "Thêm khóa học mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={course}
          className="mt-4"
        >
          <Form.Item
            label="Tên khóa học"
            name="courseName"
            rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả khóa học" },
            ]}
          >
            <Input.TextArea
              placeholder="Nhập mô tả chi tiết về khóa học"
              rows={4}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Mã khóa học"
              name="courseCode"
              rules={[{ required: true, message: "Vui lòng nhập mã khóa học" }]}
            >
              <Input placeholder="Ví dụ: PRF192" />
            </Form.Item>

            <Form.Item
              label="Chuyên ngành"
              name="forMajor"
              rules={[
                { required: true, message: "Vui lòng chọn chuyên ngành" },
              ]}
            >
              <Select placeholder="Chọn chuyên ngành">
                <Select.Option value="SE">Kỹ thuật phần mềm</Select.Option>
                <Select.Option value="AI">Trí tuệ nhân tạo</Select.Option>
                <Select.Option value="IB">Kinh doanh quốc tế</Select.Option>
                <Select.Option value="GD">Thiết kế đồ họa</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Giảng viên"
              name="instructor"
              rules={[{ required: true, message: "Vui lòng chọn giảng viên" }]}
            >
              <Select placeholder="Chọn giảng viên">
                {userList?.map((user: any) => (
                  <Select.Option key={user._id} value={user._id}>
                    {user.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Kỳ học"
              name="semester"
              rules={[{ required: true, message: "Vui lòng chọn kỳ học" }]}
            >
              <Select placeholder="Chọn kỳ học">
                {semesterList?.map((semester: any) => (
                  <Select.Option key={semester._id} value={semester._id}>
                    {semester.semesterName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Bài tập" name="assignments">
              <Select
                mode="multiple"
                placeholder="Chọn bài tập"
                optionFilterProp="children"
              >
                {assignmentList?.map((assignment: any) => (
                  <Select.Option key={assignment._id} value={assignment._id}>
                    {assignment.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Bài học" name="lessons">
              <Select
                mode="multiple"
                placeholder="Chọn bài học"
                optionFilterProp="children"
              >
                {lessonList?.map((lesson: any) => (
                  <Select.Option key={lesson._id} value={lesson._id}>
                    {lesson.content}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="active">Hoạt động</Select.Option>
              <Select.Option value="inactive">Không hoạt động</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {isUpdate ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}

const AccountMenu: React.FC<{ user?: User }> = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const doLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-w-[200px]">
      <div className="p-2 px-4 pb-0">
        <h1 className="font-bold text-[16px]">
          {user?.name} #{user?.FEID}
        </h1>
        <p className="my-0 text-[12px]">{user?.email}</p>
      </div>
      <Divider className="my-2 border-[#ccc]" />
      <Spin spinning={loading}>
        <ul className="p-2 pt-0">
          <li>
            <Button
              className="border-none shadow-none hover:bg-[#ededed]"
              block
              onClick={() => navigate("/dashboard/account")}
            >
              Cài đặt
            </Button>
          </li>
          <li>
            <Button
              className="border-none shadow-none hover:bg-[#ededed]"
              block
              onClick={doLogout}
            >
              Đăng xuất
            </Button>
          </li>
        </ul>
      </Spin>
    </div>
  );
};

export default CourseList;
