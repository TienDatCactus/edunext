import { FolderPlus, Plus } from "@phosphor-icons/react";
import { Button, FloatButton, message, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionAddForm from "../../../../ui/_elements/Forms/Dashboard/Teacher/QuestionAddForm";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import { addQuestionByTeacher } from "../../../../utils/api";
import { Question, QuestionQuizContent } from "../../../../utils/interfaces";

function QuestionModify() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [question] = useState<Question>(state?.lesson);
  const [questionArray, setQuestionArray] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
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

  const handleAddQuestion = (newQuestion: any, index: number | null = null) => {
    if (index !== null) {
      const updatedQuestions = [...questionArray];
      updatedQuestions[index] = newQuestion;
      setQuestionArray(updatedQuestions);
    } else {
      setQuestionArray([...questionArray, newQuestion]);
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await addQuestionByTeacher(questionArray);
      if (res) {
        message.success("Thêm câu hỏi thành công");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="p-4 my-2 bg-white rounded-lg shadow-lg">
        <h1 className="text-[1.75rem] font-semibold">Danh sách câu hỏi : </h1>
        {question?._id && (
          <p className="text-[0.875rem] text-[#878787]">
            Mã chương : #{question?.lesson}
          </p>
        )}
      </div>
      <Spin spinning={loading}>
        <div className="flex flex-col h-full gap-2">
          {Array.isArray(question?.content)
            ? questions &&
              question?.content?.map((q, index) => {
                return (
                  <QuestionAddForm
                    key={index}
                    prop={{
                      answer: q?.answer,
                      correct: q?.correctAnswer,
                      lessonId: state?.lesson?.lesson || state?.lessonId,
                      question: state?.lesson,
                      content: q?.title,
                      type: q?.type,
                      status: q?.status,
                    }}
                  />
                );
              })
            : questions &&
              questions.map((q, index) => (
                <QuestionAddForm
                  key={index}
                  prop={{
                    number: q,
                    index: index,
                    lessonId: state?.lesson?.lesson || state?.lessonId,
                    addQuestion: handleAddQuestion,
                    handleSubmit: handleSubmit,
                    question: question,
                  }}
                />
              ))}

          {question === undefined ? (
            <Button
              type="dashed"
              icon={<Plus size={16} />}
              className="w-[100%] mt-4 border-dashed"
              onClick={addQuestion}
            >
              Thêm câu hỏi
            </Button>
          ) : (
            <span></span>
          )}
        </div>
      </Spin>
    </DashboardLayout>
  );
}

export default QuestionModify;
