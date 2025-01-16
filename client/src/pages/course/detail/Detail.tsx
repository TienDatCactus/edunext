import { ArrowLeft, Info } from "@phosphor-icons/react";
import { Breadcrumb, Button, message, Spin, Tabs, TabsProps, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseModal from "../../../ui/_elements/Modals/CourseModal";
import CourseLayout from "../../../ui/layouts/CourseLayout";
import MainLayout from "../../../ui/layouts/MainLayout";
import { getCourseDetail } from "../../../utils/api";
import { getCurrentSeason } from "../../../utils/customHooks";
import { CourseItem, LessonItem } from "../../../utils/interfaces";
import { CustomTabs } from "../../../utils/styles/CustomStyles";
import ClassStudents from "./sub_pages/ClassStudents";
import CourseInfo from "./sub_pages/CourseInfo";

const Detail: React.FC = () => {
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<CourseItem>();
  const [lesson, setLesson] = useState<LessonItem>();
  const getDetail = async () => {
    if (!courseId) return;
    try {
      setLoading(true);
      const resp = await getCourseDetail(Number(courseId));
      if (resp?.isOk) {
        setDetail(resp?.course[0]);
        setLesson(resp?.lessons);
      }
    } catch (error) {
      message.error("Gặp lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      getDetail();
    };
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Course Info",
      children: (
        <Spin spinning={loading}>
          <CourseLayout
            id={detail?.courseId}
            code={detail?.courseCode}
            name={detail?.courseName}
            instructor="dat"
          >
            <CourseInfo
              courseCode={detail?.courseCode}
              courseName={detail?.courseName}
              questions={lesson?.questions || []}
              description={detail?.description}
              lessons={Array.isArray(lesson?.lessons) ? lesson?.lessons : []}
              tagName={lesson?.tags?.tagName || ""}
            />
          </CourseLayout>
        </Spin>
      ),
      icon: <Info size={16} />,
    },
    {
      key: "2",
      label: "Students",
      children: (
        <Spin spinning={loading}>
          <CourseLayout
            id={detail?.courseId}
            code={detail?.courseCode}
            name={detail?.courseName}
            instructor="dat"
          >
            <ClassStudents />
          </CourseLayout>
        </Spin>
      ),
      icon: <Info size={16} />,
    },
  ];
  console.log(lesson);
  return (
    <MainLayout>
      <div className="bg-[linear-gradient(to_top,_#ffffff_0%,_#bae5f5_100%)] min-h-[160px] py-4">
        <div className="flex items-center justify-between px-14">
          <div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate(-1)}
                className="p-0 border-none shadow-none bg-inherit"
              >
                <ArrowLeft size={32} />
              </Button>
              <h1 className="text-[22px] font-semibold">
                {detail?.courseName}
              </h1>
              <Tag color="#ffffff" className="font-light text-black">
                #{detail?.courseCode}
              </Tag>
            </div>
            <div className="pt-2">
              <Breadcrumb
                className="text-[12px]"
                items={[
                  {
                    title: <a href="/">Trang chủ</a>,
                  },
                  {
                    title: <a href={`/home/${year}/${month}`}>Môn học</a>,
                  },
                  {
                    title: <p className="code">{detail?.courseName}</p>,
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button>Thêm vào danh sách</Button>
            <Button type="primary" onClick={showModal}>
              Xem chi tiết
            </Button>
            <CourseModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        <div className="pt-8">
          <Tabs
            type="card"
            defaultActiveKey="1"
            items={items}
            className={CustomTabs}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Detail;
