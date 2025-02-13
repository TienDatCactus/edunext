import {
  Backpack,
  Blueprint,
  CircleDashed,
  CircleHalf,
  Circuitry,
  ClockUser,
  Keyboard,
  Plus,
  Timer,
  Trash,
} from "@phosphor-icons/react";
import type { TabsProps } from "antd";
import { Button, Collapse, Divider, Progress, Tabs, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import dayjs from "dayjs";
import { type } from "os";
function LessonDetail() {
  const [questions, setQuestions] = useState<any>([]);
  const fetchQuestion = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/question/getQuestions"
      );
      if (res) {
        setQuestions(res.data.data);
      }
    } catch (error) {}
  };
  console.log(questions);

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả",
      children: (
        <div className="flex flex-col gap-4">
          {!!questions.length &&
            questions.map((question: any, index: number) => (
              <Collapse
                collapsible="header"
                className="bg-white hover:bg-[#f7fbfe] hover:border-[#7fc8ff] shadow-md"
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: index,
                    label: (
                      <div className="flex flex-col gap-2 px-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[1rem] text-[#878787] font-semibold ">
                              #{question?._id.substring(0, 6)}
                            </span>
                            <span>-</span>
                            <span className="text-[1.25rem] font-bold">
                              {typeof question.content === "string"
                                ? question.content
                                : question.content[0]?.title}
                            </span>
                            {question?.status ? (
                              <Tag
                                className="flex items-center gap-1 rounded-lg dm-sans"
                                color="warning"
                                icon={<CircleDashed size={16} />}
                              >
                                Chưa có câu trả lời
                              </Tag>
                            ) : (
                              <Tag
                                className="flex items-center gap-1 rounded-lg dm-sans"
                                color="processing"
                                icon={<CircleHalf size={16} />}
                              >
                                Đã có câu trả lời
                              </Tag>
                            )}
                          </div>
                          <div>
                            <Button
                              type="primary"
                              danger
                              icon={<Trash size={18} />}
                            >
                              Xóa
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center *:text-[#898989] text-[0.75rem]">
                          <span className="flex items-center gap-1">
                            <Circuitry size={18} />
                            Câu hỏi thành phần
                          </span>
                          <span className="px-[30px] flex items-center">
                            <ClockUser size={18} className="mr-[5px]" />
                            {dayjs(question?.createdAt).format(
                              "hh:mm DD/MM/YYYY"
                            )}
                          </span>
                          <span className="flex items-center">
                            <Blueprint size={18} className="mr-[5px]" />
                            {question?.type}
                          </span>
                        </div>
                        <Divider className="my-0 border-[#ccc]" />
                        <div className="flex items-center gap-2">
                          <Progress
                            type="dashboard"
                            className="animate-spin"
                            percent={50}
                            size={16}
                          />
                          <span className="font-semibold text-[0.875rem]">
                            Số lượng câu trả lời (20/30)
                          </span>
                          <span className="text-[0.625rem] text-[#878787] font-semibold">
                            Cập nhật {dayjs().toNow(true)} trước
                          </span>
                        </div>
                      </div>
                    ),
                    children: (
                      <div>
                        <div className="w-full rounded-lg">
                          {typeof question.content === "string"
                            ? "Đây là tự luận"
                            : question.content[0]?.answer?.map(
                                (option: any, optionIndex: number) => (
                                  <label
                                    key={option}
                                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                      question.content[0]?.answer[
                                        question.content[0]?.correctAnswer
                                      ] === option
                                        ? "#f0f0f0"
                                        : "hover:#bfbfbf"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`question-${question?._id}`}
                                      value={option}
                                      checked={
                                        question.content[0]?.answer[
                                          question.content[0]?.correctAnswer
                                        ] === option
                                      }
                                      className="hidden"
                                    />
                                    <span
                                      className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                                        question.content[0]?.answer[
                                          question.content[0]?.correctAnswer
                                        ] === option
                                          ? "border-blue-500 bg-blue-500"
                                          : "border-gray-500"
                                      }`}
                                    >
                                      {question.content[0]?.answer[
                                        question.content[0]?.correctAnswer
                                      ] === option && (
                                        <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                                      )}
                                    </span>
                                    <span className="ml-3 text-black">
                                      {option}
                                    </span>
                                  </label>
                                )
                              )}
                        </div>
                      </div>
                    ),
                    showArrow: false,
                  },
                ]}
              />
            ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Đã trả lời",
    },
    {
      key: "3",
      label: "Chưa trả lời",
    },
  ];

  useEffect(() => {
    fetchQuestion();
  }, []);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between my-2">
        <h1 className="text-[2.125rem] font-bold">Danh sách câu hỏi</h1>
        <Button type="primary" icon={<Plus />}>
          Thêm câu hỏi
        </Button>
      </div>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        className="[&_.ant-tabs-nav]:m-0 [&_.ant-tabs-content-holder]:bg-white [&_.ant-tabs-content-holder]:shadow-md [&_.ant-tabs-content-holder]:rounded-md [&_.ant-tabs-content-holder]:p-2"
      />
    </DashboardLayout>
  );
}

export default LessonDetail;
