import { Check, ExclamationMark, SealQuestion } from "@phosphor-icons/react";
import { Button, Tag } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const QuestionItem: React.FC<{
  questionId?: number;
  status?: boolean;
  lessonId?: number;
  index?: number;
}> = ({ questionId, status, lessonId, index }) => {
  const navigate = useNavigate();
  const { courseCode } = useParams();
  return (
    <li className="flex items-center justify-between p-2 rounded-md cursor-pointer -slideInLeft group ">
      <div className="flex items-center gap-2">
        <SealQuestion size={22} />
        <h1>Câu hỏi #{index}</h1>
      </div>
      <div className="flex items-center gap-2 ">
        <Tag
          icon={
            !status ? (
              <ExclamationMark size={22} className="group-hover: -bounce" />
            ) : (
              <Check size={22} className="group-hover: -rubberBand" />
            )
          }
          color={!status ? "red" : "green"}
          className="flex items-center gap-2 min-h-[30px] "
        >
          {!status ? "chưa hoàn thành" : "đã hoàn thành"}
        </Tag>
        <Button
          onClick={() =>
            navigate(
              `/course/${courseCode}/lesson/${lessonId}/question/${questionId}`
            )
          }
        >
          Xem
        </Button>
      </div>
    </li>
  );
};

export default QuestionItem;
