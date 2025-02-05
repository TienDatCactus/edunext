import { Eye, Question } from "@phosphor-icons/react";
import { Button, Empty } from "antd";
import React from "react";
import LessonDetail from "../../../../ui/_elements/Page/Course/LessonDetail";
import { CourseInfoProps } from "../../../../utils/interfaces";
const CourseInfo: React.FC<CourseInfoProps> = ({
  courseCode,
  courseName,
  description,
  lessons,
}) => {
  return (
    <>
      <div className="border-b border-[#ccc]">
        <div className="flex justify-between px-8 py-4">
          <div>
            <h1 className="text-[22px] font-semibold">{courseName}</h1>
            <p className="w-[80%] text-[12px] text-[#4f6174] leading-5 ">
              {description}
            </p>
          </div>
          <div className="flex gap-2 *:shadow-md *:font-semibold">
            <Button icon={<Question size={20} />}>Help!</Button>
            <Button icon={<Eye size={20} />}>Preview</Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 px-8 py-4">
          {!!lessons?.length &&
            lessons?.map((lesson, index) => {
              return (
                <LessonDetail
                  key={index}
                  lessonId={index + 1}
                  content={lesson?.content}
                  deadline={lesson?.deadline}
                  questions={lesson?.questions}
                  tag={lesson?.tag || ""}
                  title={lesson?.title}
                />
              );
            })}
        </div>
        {(lessons ?? []).length === 0 && (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              margin: "auto",
            }}
            className="pt-20"
            description={
              <p className="py-2 text-[16px]">Môn học không có bài học nào</p>
            }
          />
        )}
      </div>
    </>
  );
};

export default CourseInfo;
