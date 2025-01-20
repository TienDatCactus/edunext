import { BookBookmark, Question } from "@phosphor-icons/react";
import { Kanban } from "@phosphor-icons/react/dist/ssr";
import { Badge, Button, Divider, Select } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const { Ribbon } = Badge;
const QuestionSidebar: React.FC<{
  meetings: {
    meetingType?: string;
    meetingLink?: string;
    _id?: string;
  }[];
  remainQuestions: {
    _id?: string;
    status?: boolean;
  }[];
}> = ({ meetings, remainQuestions }) => {
  const { courseCode, lessonId } = useParams();
  const [value, setValue] = useState<string>("none");
  const handleJoinMeeting = () => {
    if (value != "none") {
      window.open(value, "_blank");
    }
  };
  return (
    <div className=" -fadeInUp col-span-4 border rounded-md shadow-lg  max-h-[620px]">
      <div className="flex items-center justify-between px-2 py-3 ">
        <div className="flex items-center gap-2">
          <Kanban size={22} />
          <h1 className="text-[14px] text-[#4a4a4a]">Sphere's Resource</h1>
        </div>
        <div>
          <Question size={20} />
        </div>
      </div>
      <Divider className="border-[#ccc] m-0" />
      <div className="px-4 pt-2 pb-3 m-2 bg-white border rounded-md shadow-md">
        <label htmlFor="meet" className="text-[12px] text-[#4b4b4b]">
          Meeting resources
        </label>
        <Select
          id="meet"
          defaultValue="none"
          className="w-full my-1 shadow-md"
          onChange={(value) => setValue(value)}
          options={[
            {
              value: "none",
              label: "Select meeting method",
              className: "text-[#4b4b4b] bg-[#eaeaea]",
            },
            ...meetings.map((meet) => ({
              value: meet.meetingLink,
              label: meet.meetingType,
            })),
          ]}
        />
        <Button
          color="default"
          type={value == "none" ? "dashed" : "primary"}
          className={`${
            value == "none" ? "bg-[#fbfbfb] text-[#75777c]" : ""
          } w-full my-1`}
          disabled={value == "none"}
          onClick={handleJoinMeeting}
        >
          {value == "none"
            ? "Please choose 1 corresponding meeting method"
            : "Join meeting"}
        </Button>
      </div>
      <div className="px-4 pt-2 m-2 bg-white border rounded-md shadow-md">
        <h1 className="text-[20px] font-semibold">Answer Chart</h1>
        <div className="py-2">Coming soon</div>
      </div>
      <div className="px-4 pt-2 m-2 bg-white border rounded-md shadow-md">
        <h1 className="text-[20px] font-semibold">Pass Criteria</h1>
        <ul className="[&_li]:flex [&_li]:justify-between [&_li]:text-[14px] py-2">
          <li>
            <span>No. of comments posted</span>
            <span>1</span>
          </li>
          <li>
            <span>No. of stars rated by others</span>
            <span>1</span>
          </li>
          <li>
            <span>No. of votes</span>
            <span>1</span>
          </li>
        </ul>
      </div>
      <div className="px-4 pt-2 m-2 bg-white border rounded-md shadow-md">
        <h1 className="text-[20px] font-semibold">Table of Contents</h1>
        <ul className="[&_li]:flex [&_li]:text-[14px] [&_li]:px-2 [&_li]:py-4 [&_li]:border  cursor-pointer py-2 [&_li]:rounded-md flex flex-col gap-2">
          {!!remainQuestions.length &&
            remainQuestions?.map((question, index) => (
              <Ribbon
                key={index}
                text={question?.status ? "đã hoàn thành" : "chưa hoàn thành"}
                color={question?.status ? "#ccefbf" : "#fde1ac"}
                className="[&_.ant-ribbon-text]:text-[#333a43] [&_.ant-ribbon-text]:text-[12px]"
              >
                <a
                  href={`/course/${courseCode}/lesson/${lessonId}/question/${question?._id}`}
                >
                  <li className="hover:shadow-lg hover:bg-[#ededed]">
                    <div className="flex items-center gap-2">
                      <BookBookmark size={26} />
                      <h1 className="text-[16px]">
                        Câu hỏi #{question?._id?.slice(20, -1)}
                      </h1>
                    </div>
                  </li>
                </a>
              </Ribbon>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionSidebar;
