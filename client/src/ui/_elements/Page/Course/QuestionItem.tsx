import { Check, ExclamationMark, SealQuestion } from "@phosphor-icons/react";
import { Button, Tag } from "antd";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const QuestionItem: React.FC<{
  questionId?: number;
  status?: boolean;
  lessonId?: number;
  index?: number;
  type?: "quiz" | "code" | "response";
}> = ({ questionId, status, lessonId, index, type = "response" }) => {
  const { courseCode } = useParams();
  const swapper = {
    quiz: "Trắc nghiệm",
    code: "Lập trình",
    response: "Tự luận",
  };
  return (
    <li className="flex items-center justify-between p-2 rounded-md cursor-pointer -slideInLeft group ">
      <div className="flex items-center gap-2">
        <SealQuestion size={22} />
        <h1>Câu hỏi #{index}</h1>
        <Tag color="cyan" className="quick-sand">
          {swapper[type]}
        </Tag>
      </div>
      <div className="flex items-center gap-2">
        <Tag
          icon={
            !status ? (
              <ExclamationMark size={22} className="" />
            ) : (
              <Check size={22} className="" />
            )
          }
          color={!status ? "red" : "green"}
          className="flex items-center gap-2 min-h-[30px] "
        >
          {!status ? "chưa hoàn thành" : "đã hoàn thành"}
        </Tag>
        <Link
          to={`/course/${courseCode}/lesson/${lessonId}/question`}
          state={{
            questionId: questionId,
          }}
        >
          <Button>Xem</Button>
        </Link>
      </div>
    </li>
  );
};

export default QuestionItem;
