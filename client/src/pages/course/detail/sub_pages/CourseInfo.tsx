import { Eye, Question } from "@phosphor-icons/react";
import { Button, Empty } from "antd";
import React from "react";
import LessonDetail from "../../../../ui/_elements/Page/Course/LessonDetail";
import { useCourseStore } from "../../../../utils/zustand/Store";
const CourseInfo: React.FC = () => {
  const { detail } = useCourseStore();
  return (
    <>
      <div className="border-b border-[#ccc]">
        <div className="flex justify-between px-8 py-4">
          <div>
            <h1 className="text-[22px] font-semibold">{detail?.courseName}</h1>
            <p className="w-[80%] text-[12px] text-[#4f6174] leading-5 ">
              {detail?.description}
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
          {!!detail?.lessons?.length &&
            detail?.lessons?.map((lesson, index) => {
              return (
                <LessonDetail
                  key={index}
                  lessonId={index + 1}
                  lesson={lesson}
                />
              );
            })}
        </div>
        {(detail?.lessons ?? []).length === 0 && (
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
