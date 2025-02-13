import { Button, Divider } from "antd";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { Backpack, Keyboard, Plus, Timer, Trash } from "@phosphor-icons/react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
function LessonDetail() {
  const [questions, setQuestions] = useState<any>([]);

  const items: CollapseProps["items"] = questions.map(
    (question: any, index: any) => ({
      key: index,
      label: (
        <div>
          <div className="flex justify-between">
            <div>
              <span className="text-[16px]">#{question?._id}</span>
              <span className="mx-[5px]">-</span>
              <span className="text-[20px]">
                <strong>
                  {typeof question.content === "string"
                    ? question.content
                    : question.content[0]?.title}
                </strong>
              </span>
              {question?.status ? (
                <button className="ml-[16px] bg-[#b7eb8f] py-[5px] px-[10px] rounded-[10px] font-bold">
                  Done
                </button>
              ) : (
                <button className="ml-[16px] bg-[#bae7ff] py-[5px] px-[10px] rounded-[10px] font-bold">
                  In process
                </button>
              )}
            </div>
            <div>
              <Button type="primary" danger>
                <Trash size={18} />
                Delete
              </Button>
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <span className="flex items-center">
              <Keyboard size={18} className="mr-[5px]" />
              Quiz
            </span>
            <span className="px-[30px] flex items-center">
              <Timer size={18} className="mr-[5px]" />
              {question?.createdAt}
            </span>
            <span className="flex items-center">
              <Backpack size={18} className="mr-[5px]" />
              {question?.type}
            </span>
          </div>
          <Divider />
          <div>
            <span>Number of respondents (20)</span>
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
                      <span className="ml-3 text-black">{option}</span>
                    </label>
                  )
                )}
          </div>
        </div>
      ),
    })
  );

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

  useEffect(() => {
    fetchQuestion();
  }, []);
  return (
    <DashboardLayout>
      <div className="p-5">
        <div className="flex items-center justify-between mb-[30px]">
          <h1 className="text-[20px]">
            <strong>Questions</strong>
          </h1>
          <Button type="primary">
            <Plus size={18} />
            Add question
          </Button>
        </div>

        <Collapse items={items} />
      </div>
    </DashboardLayout>
  );
}

export default LessonDetail;
