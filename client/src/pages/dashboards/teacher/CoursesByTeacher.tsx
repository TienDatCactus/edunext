import {
  CalendarBlank,
  FolderPlus,
  GridFour,
  Trash,
} from "@phosphor-icons/react";
import {
  Button,
  Divider,
  Dropdown,
  MenuProps,
  message,
  Segmented,
  Spin,
  Switch,
  Tag,
} from "antd";
import React, { useEffect } from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { useCourseStore, useUserStore } from "../../../utils/zustand/Store";
import { currentYear } from "../../course/home/HomePage";
import se from "../../../assets/images/wallhaven-x892zz_3840x2160.png";
import dayjs from "dayjs";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a rel="noopener noreferrer" href={`/home/${currentYear}/spring`}>
        SPRING {currentYear}
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a rel="noopener noreferrer" href={`/home/${currentYear}/summer`}>
        SUMMER {currentYear}
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a rel="noopener noreferrer" href={`/home/${currentYear}/fall`}>
        FALL {currentYear}
      </a>
    ),
  },
];

const CoursesByTeacher: React.FC = () => {
  const { user } = useUserStore();
  const { courses, error, loading, fetchCourses } = useCourseStore();
  useEffect(() => {
    if (error) message.error(error);
    return () => {
      fetchCourses();
    };
  }, []);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between my-2 ">
        <div>
          <p className="text-[#878787] text-[0.5rem]">Quản trị trang</p>
          <h1 className="text-[2rem] font-semibold">
            Các môn học quản lí bởi {user?.name}
          </h1>
        </div>
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <Button
            icon={<CalendarBlank size={22} />}
            className="px-8 py-6 border-none  rounded-none text-[16px]"
          >
            Kì Học
          </Button>
        </Dropdown>
      </div>
      <Divider className="border-[#b3b3b3] my-4" />
      <div className="flex items-center justify-between mb-4">
        <Segmented
          className="shadow-md"
          options={["Tất cả", "Đang hoạt động", "Tạm ngừng"]}
        />
      </div>
      <div>
        <Spin spinning={loading}>
          <ul className="grid grid-cols-12 gap-2">
            {!!courses?.length &&
              courses?.map((course, index) => (
                <li className="flex flex-col gap-2 p-2 bg-white border rounded-lg shadow-md md:col-span-4">
                  <div className="max-h-[100px]">
                    <img
                      className="object-cover w-full h-full rounded-lg"
                      loading="lazy"
                      src={`${se}`}
                      alt="se"
                    />
                  </div>
                  <div className="">
                    <h1 className="font-semibold">{course?.courseName}</h1>
                    <p className="line-clamp-2">{course?.description}</p>
                  </div>
                  <ul className="flex flex-wrap items-center gap-0">
                    <Tag className="border-none bg-[#f3f3f5] rounded-xl quick-sand">
                      {course?.status === "active"
                        ? "Đang hoạt động"
                        : "Tạm ngừng"}
                    </Tag>
                    <Tag className="border-none bg-[#f3f3f5] rounded-xl quick-sand">
                      {course?.courseCode}
                    </Tag>
                  </ul>
                  <div className="flex items-center justify-between">
                    <p className="text-[0.75rem] text-[#878787]">
                      Chỉnh sửa {dayjs().to("20/10/2024")}*
                    </p>
                    <Switch defaultChecked />
                  </div>
                </li>
              ))}
          </ul>
        </Spin>
      </div>
    </DashboardLayout>
  );
};

export default CoursesByTeacher;
