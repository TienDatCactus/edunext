import { Plus } from "@phosphor-icons/react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionAddForm from "../../../../ui/_elements/Forms/Dashboard/Teacher/QuestionAddForm";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import { Question, QuestionQuizContent } from "../../../../utils/interfaces";

function QuestionModify() {
  const location = useLocation();
  const { state } = location;
  const [question] = useState<Question>(state?.lesson);
  const [questions, setQuestions] = useState<
    (string & any[]) | (QuestionQuizContent & any[]) | undefined
  >();
  useEffect(() => {
    if (Array.isArray(state?.lesson?.content)) {
      state &&
        setQuestions(
          Array.isArray(state?.lesson?.content) ? state?.lesson?.content : [1]
        );
    } else {
      state && setQuestions([1]);
    }
  }, []);

  const addQuestion = () => {
    if (questions) setQuestions([...questions, questions?.length + 1]);
  };
  return (
    <DashboardLayout>
      <div className="p-4 my-2 bg-white rounded-lg shadow-lg">
        <h1 className="text-[1.75rem] font-semibold">Danh sách câu hỏi : </h1>
        {question?._id && (
          <p className="text-[0.875rem] text-[#878787]">
            Mã chương : #{question?._id}
          </p>
        )}
      </div>
      <div className="flex flex-col min-h-screen gap-2">
        {Array.isArray(question?.content)
          ? questions &&
            question?.content?.map((q, index) => (
              <QuestionAddForm
                key={index}
                prop={{
                  answer: q?.answer,
                  correct: q?.correctAnswer,
                  content: q?.title,
                  type: question?.type,
                  status: question?.status,
                  id: question?._id,
                  index: index + 1,
                }}
              />
            ))
          : questions &&
            questions.map((q, index) => (
              <QuestionAddForm
                key={index}
                prop={{ question: question, index: index + 1 }}
              />
            ))}
        {!!question && question?.type == "quiz" && (
          <Button
            type="dashed"
            icon={<Plus size={16} />}
            className="w-[100%] mt-4 border-dashed"
            onClick={addQuestion}
          >
            Thêm câu hỏi
          </Button>
        )}
      </div>
    </DashboardLayout>
  );
}

export default QuestionModify;
