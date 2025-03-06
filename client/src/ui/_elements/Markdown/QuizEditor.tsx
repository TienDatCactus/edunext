import { Button, Radio } from "antd";
import React, { useState } from "react";
import { Question as StoreQuestion } from "../../../utils/interfaces";
import { PaperPlaneTilt } from "phosphor-react";

interface QuizViewerProps {
  question: StoreQuestion;
}

const QuizEditor: React.FC<QuizViewerProps> = ({ question }) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleCheckAnswers = () => {
    setShowAnswers(true);
  };

  return (
    <div>
      <div className="rounded-lg shadow-md border border-[#d9d9d9] p-2">
        <h1 className="text-[1.375rem] font-semibold">
          Câu hỏi 1 -{" "}
          {Array.isArray(question?.content) && question?.content?.length}
        </h1>
        <p className="text-[#6e6e6e]">Chọn câu trả lời đúng A, B, C hoặc D</p>
      </div>
      <div className="my-2">
        {Array.isArray(question?.content) &&
          !!question?.content &&
          question?.content?.map((q, i) => (
            <div className="py-3 px-6 rounded-md shadow-md border border-[#d9d9d9]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center w-5 h-5 text-sm text-white bg-[#242837] rounded-full">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-[1.125rem] font-semibold">
                  {q?.title}
                </p>
              </div>
              <Radio.Group
                className="w-full"
                onChange={(e) => handleAnswerSelect(i, e.target.value)}
                value={userAnswers[i]}
                disabled={showAnswers}
              >
                {q?.answers?.map((option: string, index: number) => (
                  <Radio
                    key={index}
                    value={index}
                    className={`w-full p-2 rounded-md bg-[#f5f5f5] hover:bg-[#e9e9e9] mb-2 relative ${
                      showAnswers && q?.correctAnswer === index
                        ? "border border-[#4caf50] bg-[#e8f5e9]"
                        : showAnswers &&
                          userAnswers[i] === index &&
                          q?.correctAnswer !== index
                        ? "border border-[#f44336] bg-[#ffebee]"
                        : ""
                    }`}
                  >
                    {option}
                    {showAnswers && q?.correctAnswer === index && (
                      <div className="absolute -translate-y-1/2 right-3 top-1/2">
                        <svg
                          className="w-5 h-5 text-[#4caf50]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                    {showAnswers &&
                      userAnswers[i] === index &&
                      q?.correctAnswer !== index && (
                        <div className="absolute -translate-y-1/2 right-3 top-1/2">
                          <svg
                            className="w-5 h-5 text-[#f44336]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      )}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          ))}
        <div className="flex justify-end gap-2 my-4">
          <Button
            type="primary"
            onClick={handleCheckAnswers}
            className="px-6 py-2 bg-[#4caf50] hover:bg-[#45a049] transition-all duration-200 rounded-md shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Kiểm tra kết quả
          </Button>
          <Button icon={<PaperPlaneTilt />} type="dashed">
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;
