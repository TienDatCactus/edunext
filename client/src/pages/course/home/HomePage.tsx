import { CalendarBlank } from "@phosphor-icons/react";
import {
  Button,
  Col,
  Dropdown,
  Empty,
  MenuProps,
  message,
  Row,
  Spin,
  Tag,
} from "antd";
import { useEffect } from "react";
import CourseCard from "../../../ui/_elements/Page/Home/CourseCard";
import CourseProgress from "../../../ui/_elements/Page/Home/CourseProgress";
import TimeTable from "../../../ui/_elements/Page/Home/TimeTable";
import MainLayout from "../../../ui/layouts/MainLayout";
import { useCourseStore } from "../../../utils/zustand/Store";
export const currentYear = new Date().getFullYear().toString();
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

const HomePage: React.FC = () => {
  const { courses, error, loading, fetchCourses } = useCourseStore();
  useEffect(() => {
    if (error) message.error(error);
    return () => {
      if (courses.length === 0) {
        fetchCourses();
      }
    };
  }, []);
  console.log(courses);

  return (
    <MainLayout>
      <div className="p-6 mx-10 mb-6 bg-white rounded-lg shadow-lg min-h-[300px]">
        <div className="flex items-start gap-2">
          <h1 className="text-3xl font-semibold ">Các môn trong kì này</h1>
          <Tag className="px-3 text-[14px] bg-[#ffffff] rounded-none border-2 border-[#898a93] code">
            {courses?.length}
          </Tag>
        </div>
        <div className="flex items-center justify-between py-4">
          <h2 className="text-xl mb-[20px]">Tháng 11</h2>
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <Button
              icon={<CalendarBlank size={22} />}
              className="px-8 py-6 border-none bg-[#f7f7f7] rounded-none text-[16px]"
            >
              Kì Học
            </Button>
          </Dropdown>
        </div>
        <div className="">
          <Spin spinning={loading}>
            <Row className="flex flex-wrap items-center gap-10">
              {courses?.map((item, index) => {
                return (
                  <Col key={index} span={6}>
                    <CourseCard item={item} />
                  </Col>
                );
              })}
            </Row>
            {courses?.length === 0 && (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 100,
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                }}
                className="pb-10"
                description={
                  <p className="py-2 text-[16px]">Không có môn học nào</p>
                }
              />
            )}
          </Spin>
        </div>
      </div>
      <div className="mx-10 mb-6 ">
        <Row gutter={16}>
          <Col span={15}>
            <TimeTable />
          </Col>
          <Col span={9}>
            <CourseProgress />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default HomePage;
