import {
  CalendarDots,
  DevToLogo,
  FolderOpen,
  SubtractSquare,
} from "@phosphor-icons/react";
import { Avatar, Button, Divider, message, Spin, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourseStore } from "../../../../utils/zustand/Store";
import { LessonItem } from "../../../../utils/interfaces";
export const LessonsList: React.FC<{ state: string }> = (state) => {
  const { courses, error, loading, fetchCourses } = useCourseStore();
  useEffect(() => {
    if (error) message.error(error);
    if (courses.length === 0) {
      fetchCourses();
    }
  }, []);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  useEffect(() => {
    if (courses.length > 0) {
      const allLessons = courses.flatMap((course) =>
        course?.lessons?.map((lesson) => ({
          ...lesson,
          courseCode: course?.courseCode,
          courseName: course?.courseName,
        }))
      );
      setLessons(
        allLessons.filter((lesson) => lesson !== undefined) as LessonItem[]
      );
    }
  }, [courses]);
  const navigate = useNavigate();
  const [randomColor, setRandomColor] = React.useState({
    bg: "#ffffff",
    text: "#000",
  });
  const colorRandomizer = () => {
    const colors = [
      { bg: "#e1d2ff", text: "#916f94" },
      { bg: "#f5f6f1", text: "#a5a988" },
      { bg: "#bae5f5", text: "#4f5dd6" },
      { bg: "#ccefbf", text: "#87a08e" },
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(randomColor);
  };
  console.log(lessons);
  useEffect(() => {
    return colorRandomizer();
  }, []);
  return (
    <Spin spinning={loading}>
      <ul className="grid grid-cols-12 gap-3">
        {!!lessons.length &&
          lessons.map((lesson, index) => (
            <li
              key={index}
              className="col-span-4 min-h-[260px] bg-white rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between px-4 pt-2">
                <Tag
                  className="font-medium border-none rounded-2xl dm-sans"
                  style={{
                    color: randomColor.text,
                    backgroundColor: randomColor.bg,
                  }}
                >
                  {lesson?.tag}
                </Tag>
                <Button
                  className="border-none"
                  onClick={() =>
                    navigate("/dashboard/lessons/detail", {
                      state: {
                        lessonId: lesson?._id,
                      },
                    })
                  }
                >
                  <FolderOpen
                    className="text-[#878787] hover:animate-pulse"
                    size={20}
                    weight="fill"
                  />
                </Button>
              </div>
              <div className="px-4">
                <Tooltip title={lesson?.title}>
                  <h1 className="font-semibold truncate text-[1.25rem] my-1">
                    {lesson?.title}
                  </h1>
                </Tooltip>
                <Tooltip title={lesson?.content}>
                  <p className="truncate text-wrap line-clamp-2 text-[0.75rem]">
                    {lesson?.content}
                  </p>
                </Tooltip>
              </div>
              <div className="bg-[#efefef] mx-4 p-2 flex items-center gap-2 my-2 rounded-lg shadow-md">
                <div className="p-1 bg-white rounded-md">
                  <SubtractSquare size={32} />
                </div>
                <div>
                  <h1 className="text-[1rem] font-bold">
                    {lesson?.courseCode}
                  </h1>
                  <p className="font-medium code text-[#878787] line-clamp-1 ">
                    {lesson?.courseName}
                  </p>
                </div>
              </div>
              <Divider className="border-[#ccc] my-4 mb-3" />
              <div className="flex items-center justify-between px-4">
                <Avatar.Group className="*:border *:border-[#878787] ">
                  <Avatar
                    size={"small"}
                    src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Christopher&flip=true"
                  />
                  <Avatar
                    size={"small"}
                    src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=George&flip=true"
                  />
                  <Avatar
                    size={"small"}
                    src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Riley&flip=true"
                  />
                </Avatar.Group>
                <div className="*:text-[#878787] flex items-center gap-1">
                  <CalendarDots size={14} />
                  <p className="text-[0.75rem]">
                    {dayjs().format("d/MMM/YYYY")}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </Spin>
  );
};

export default LessonsList;
