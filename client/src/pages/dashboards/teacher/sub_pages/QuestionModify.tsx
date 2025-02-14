import { Button } from "antd";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import { Plus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import AddForm from "../../../../ui/_elements/Forms/Dashboard/Teacher/QuestionAddForm";
import { useLocation } from "react-router-dom";
import { LessonItem, Question } from "../../../../utils/interfaces";

function QuestionModify() {
  const [questions, setQuestions] = useState([1]);
  const [question, setQuestion] = useState<Question>();
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    state && setQuestion(state?.lesson);
  }, []);
  console.log(question);
  const addQuestion = () => {
    setQuestions([...questions, questions.length + 1]);
  };

  return (
    <DashboardLayout>
      <div className="p-4 my-2 bg-white rounded-lg shadow-lg">
        <h1 className="text-[1.75rem] font-semibold">Danh sách câu hỏi : </h1>
        <p className="text-[0.875rem] text-[#878787]">
          Mã chương : #{question?.lesson}{" "}
        </p>
      </div>
      <div className="min-h-screen">
        {questions.map((questionIndex) => (
          <AddForm key={questionIndex} question={question} />
        ))}
        <Button
          type="dashed"
          icon={<Plus size={16} />}
          className="w-[100%] mt-4 border-dashed"
          onClick={addQuestion}
        >
          Add Question
        </Button>
      </div>
    </DashboardLayout>
  );
}

export default QuestionModify;
