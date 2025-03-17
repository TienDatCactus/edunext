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
} from "antd";

import { Bell } from "@phosphor-icons/react/dist/ssr";
import type { FormProps } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { FadersHorizontal, FunnelSimple, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
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
import { User } from "../../../utils/interfaces";
import { useUserStore } from "../../../utils/zustand/Store";

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
  assignments?: String[];
  instructor?: String;
  semester?: String;
  lessons?: String[];
  forMajor?: String;
  status?: String;
};

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [lessonList, setLessonList] = useState([]);
  const [assignmentList, setAssignmentList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState({
    courseId: "",
    courseName: "",
    description: "",
    courseCode: "",
    assignments: [],
    instructor: "",
    semester: "",
    lessons: [],
    forMajor: "",
    status: "",
  });

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const lessons = await getAllLessons();
      if (lessons) {
        setLessonList(lessons?.lessons);
      } else {
        message.error("Không có dữ liệu");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const res = await getAllAssignment();
      if (res) {
        setAssignmentList(res?.assignment);
      } else {
        message.error("Không có dữ liệu");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetChUser = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      if (res) {
        setUserList(res?.users);
      } else {
        message.error("Không có dữ liệu");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetSemester = async () => {
    try {
      setLoading(true);
      const res = await getAllSemester();
      if (res) {
        setSemesterList(res?.semester);
      } else {
        message.error("Không có dữ liệu");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const courses = await getAllCourses();
      if (courses) {
        setCourseList(courses?.course);
      } else {
        message.error("Không có dữ liệu");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
    fetchLessons();
    fetchAssignment();
    fetChUser();
    fetSemester();
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
      render: (text) => (
        <Tag className="quick-sand" color="blue">
          #{text}
        </Tag>
      ),
      key: "code",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => (
        <Tag className="quick-sand" color={text === "active" ? "green" : "red"}>
          {text === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
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
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = courseList?.map((course: any) => {
    return {
      key: course._id,
      id: course._id,
      name: course.courseName,
      description: course.description,
      instructor: course.instructor,
      semester: course.semester,
      assignments: course.assignments[0],
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
    if (isUpdate) {
      editCourse(course?.courseId, course).then((res) => {
        if (res) {
          message.success("Cập nhật thành công");
          fetchCourses();
        } else {
          message.error("Cập nhật thất bại");
        }
      });
    } else {
      addCourse(course).then((res) => {
        if (res) {
          message.success("Thêm thành công");
          fetchCourses();
        } else {
          message.error("Thêm thất bại");
        }
      });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: any) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
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
  const handleOpenAddModal = () => {
    setIsUpdate(false);
    setCourse({
      courseId: "",
      courseName: "",
      description: "",
      courseCode: "",
      assignments: [],
      instructor: "",
      semester: "",
      lessons: [],
      forMajor: "",
      status: "",
    });
    showModal();
  };

  const handleFillDataUpdate = (course: any) => {
    setIsUpdate(true);
    setCourse({
      courseId: course?.id,
      courseName: course?.name,
      description: course?.description,
      courseCode: course?.code,
      assignments: course?.assignments?.title,
      instructor: course?.instructor?.name,
      semester: course?.semester?.semesterName,
      lessons: course?.lessons?.title,
      forMajor: course?.major,
      status: course?.status,
    });
    showModal();
  };

  const handleDelete = (course: any) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      deleteCourse(course.id).then((res) => {
        if (res) {
          message.success("Xóa thành công");
          fetchCourses();
        } else {
          message.error("Xóa thất bại");
        }
      });
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const { user } = useUserStore();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between p-4 my-2 bg-white rounded-lg shadow-md">
        <h1 className="text-[2.5rem] font-semibold">Danh sách môn</h1>
        <div className="flex items-center gap-4">
          <Input.Search classNames={{ input: "quick-sand" }} />
          <Bell size={24} />
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<AccountMenu user={user} />}
            trigger="click"
            placement="bottomRight"
          >
            <img
              loading="lazy"
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.FEID}`}
              alt="dat"
              className="w-8 h-8 bg-white rounded-full border-[#ccc] shadow-md cursor-pointer active:shadow-none"
            />
          </Popover>
        </div>
      </div>
      <div className=" bg-white rounded-lg shadow-md border border-[#d9d9d9]">
        <div className="flex items-center justify-between px-4 py-2 my-2">
          <div>
            <h1 className="font-semibold">Danh sách môn học</h1>
            <span className="flex items-baseline gap-1">
              <p className="text-[0.875rem]">Tổng số :</p>
              <p className="text-[1rem] font-semibold">
                {data ? data?.length : 0}
              </p>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Input.Search
              placeholder="Tìm kiếm khóa học"
              classNames={{ input: "quick-sand" }}
            />
            <ButtonGroup>
              <Button icon={<FunnelSimple size={20} />}>Sắp xếp</Button>
              <Button icon={<FadersHorizontal size={20} />} type="primary">
                Lọc
              </Button>
            </ButtonGroup>
            <Button type="dashed" icon={<Plus />} onClick={handleOpenAddModal}>
              Thêm môn học
            </Button>
          </div>
        </div>

        <Table<DataType>
          columns={columns}
          loading={loading}
          dataSource={data}
          className="[&_.ant-table-thead_.ant-table-cell]:bg-[#f8f8f8] [&_.ant-table-tbody]:bg-[#fff]"
        />
      </div>
      <Modal
        title="Thêm khóa học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Form
            form={form}
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
              {isUpdate ? (
                <Input
                  name="assignments"
                  onChange={handleChangeInput}
                  disabled={isUpdate}
                />
              ) : (
                <Select
                  onChange={(value) =>
                    setCourse({ ...course, assignments: value })
                  }
                  placeholder="Chọn assignment"
                >
                  {assignmentList?.map((assignment: any) => (
                    <Select.Option value={assignment._id} key={assignment._id}>
                      {assignment.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item<FieldType> label="Instructor" name="instructor">
              {isUpdate ? (
                <Input onChange={handleChangeInput} disabled={isUpdate} />
              ) : (
                <Select
                  onChange={(value) =>
                    setCourse({ ...course, instructor: value })
                  }
                  placeholder="Chọn người hướng dẫn"
                >
                  {userList?.map((user: any) => (
                    <Select.Option value={user._id} key={user._id}>
                      {user.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item<FieldType> label="Kỳ học" name="semester">
              {isUpdate ? (
                <Input
                  name="semester"
                  onChange={handleChangeInput}
                  disabled={isUpdate}
                />
              ) : (
                <Select
                  onChange={(value) =>
                    setCourse({ ...course, semester: value })
                  }
                  placeholder="Chọn kỳ học"
                >
                  {semesterList?.map((semester: any) => (
                    <Select.Option value={semester._id} key={semester._id}>
                      {semester.semesterName}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item<FieldType> label="Lessons" name="lessons">
              {isUpdate ? (
                <Input
                  name="lessons"
                  onChange={handleChangeInput}
                  disabled={isUpdate}
                />
              ) : (
                <Select
                  onChange={(value) => setCourse({ ...course, lessons: value })}
                  placeholder="Chọn bài học"
                >
                  {lessonList?.map((lesson: any) => (
                    <Select.Option value={lesson._id} key={lesson._id}>
                      {lesson.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item<FieldType> label="Status" name="status">
              <Select
                onChange={(value) => setCourse({ ...course, status: value })}
                placeholder="Chọn trạng thái"
              >
                <Select.Option value="active">Hoạt động</Select.Option>
                <Select.Option value="inactive">Ngừng hoạt động</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item<FieldType> label="Chuyên ngành" name="forMajor">
              <Input name="forMajor" onChange={handleChangeInput} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default CourseList;
