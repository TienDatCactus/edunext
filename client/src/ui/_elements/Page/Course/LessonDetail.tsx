import { CalendarCheck, Quotes } from "@phosphor-icons/react";
import { Collapse, Divider, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";
import { LessonDetailProps } from "../../../../utils/interfaces";
import QuestionItem from "./QuestionItem";
import { useCourseStore, useUserStore } from "../../../../utils/zustand/Store";

const LessonDetail: React.FC<LessonDetailProps> = ({ lessonId, lesson }) => {
  const { detail } = useCourseStore();

  return (
    <>
      <Collapse
        className="bg-[#f9fafc] shadow-md [&_.ant-collapse-expand-icon]:bg-[#fefefc] [&_.ant-collapse-expand-icon]:px-2 [&_.ant-collapse-expand-icon]:py-4 [&_.ant-collapse-expand-icon]:rounded-md [&_.ant-collapse-expand-icon]:shadow-md  -zoomInUp
  [&_.ant-collapse-header]:flex  [&_.ant-collapse-header]:items-center"
        expandIconPosition="end"
        size="small"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center gap-2">
                <span></span>
                <h1 className="text-[16px] font-semibold">
                  Chương #{lessonId}
                </h1>
              </div>
            ),
            children: (
              <div>
                <div className="pb-4">
                  <div className="flex items-center gap-2">
                    <span>
                      <Quotes size={22} />
                    </span>
                    <h1 className="text-[16px] font-semibold">
                      {lesson?.title}
                    </h1>
                    <Tag
                      color="#ffffff"
                      className="border border-[#8f8f8f] rounded-md text-[#393939] shadow-md"
                    >
                      {lesson?.tag}
                    </Tag>
                  </div>
                  <p className="text-[#334155]">{lesson?.content}</p>
                </div>
                <div className="bg-[#f8fafc] border-l-2 border-blue-500 flex items-center gap-2 min-h-[40px] px-4 text-[16px]">
                  <span>
                    <CalendarCheck size={22} />
                  </span>
                  <span className="text-[#4a586b]">Hạn nộp :</span>
                  <p className="text-black">
                    {dayjs(lesson?.deadline).format("MM/DD/YYYY - HH:mm")}
                  </p>
                </div>
                <Divider
                  className="border-[#ccc] text-[12px] font-light mb-1"
                  orientation="left"
                >
                  Các câu hỏi
                </Divider>
                <div>
                  <ul className="flex flex-col gap-3">
                    {!!lesson?.questions?.length &&
                      lesson?.questions?.map((question: any, index: number) => (
                        <QuestionItem
                          key={index}
                          index={index + 1}
                          deadline={lesson?.deadline}
                          question={question}
                        />
                      ))}
                  </ul>
                </div>
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default LessonDetail;
