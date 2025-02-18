import { Plus } from "@phosphor-icons/react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionAddForm from "../../../../ui/_elements/Forms/Dashboard/Teacher/QuestionAddForm";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import { Question } from "../../../../utils/interfaces";

function QuestionModify() {
  const [questions, setQuestions] = useState([1]);
  const [question, setQuestion] = useState<Question>();
  const location = useLocation();
  const { state } = location;
  const lessonId = state?.lessonId;
  useEffect(() => {
    state && setQuestion(state?.lesson);
  }, []);
  const addQuestion = () => {
    setQuestions([...questions, questions.length + 1]);
  };

  return (
    <DashboardLayout>
      <div className="p-4 my-2 bg-white rounded-lg shadow-lg">
        <h1 className="text-[1.75rem] font-semibold">Danh sách câu hỏi : </h1>
        <p className="text-[0.875rem] text-[#878787]">
          Mã chương : #{question?.lesson || lessonId}{" "}
        </p>
      </div>
      <div className="min-h-screen">
        {questions.map((questionIndex) => (
          <QuestionAddForm key={questionIndex} question={question} />
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
