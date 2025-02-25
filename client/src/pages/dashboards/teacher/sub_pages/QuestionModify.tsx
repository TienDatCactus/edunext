import { FolderPlus, Plus } from "@phosphor-icons/react";
import { Button, FloatButton, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionAddForm from "../../../../ui/_elements/Forms/Dashboard/Teacher/QuestionAddForm";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import { addQuestionByTeacher } from "../../../../utils/api";
import { Question, QuestionQuizContent } from "../../../../utils/interfaces";
import { prop } from "@mdxeditor/editor";

function QuestionModify() {
  const location = useLocation();
  const { state } = location;
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
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(question);
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
      <Spin spinning={loading}>
        <div className="flex flex-col h-full gap-2">
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
                  }}
                />
              ))
            : questions &&
              questions.map((q, index) => (
                <QuestionAddForm
                  key={index}
                  prop={{
                    number: q,
                    index: index,
                    lessonId: state.lessonId,
                    addQuestion: handleAddQuestion,
                  }}
                />
              ))}
          <Button
            type="dashed"
            icon={<Plus size={16} />}
            className="w-[100%] mt-4 border-dashed"
            onClick={addQuestion}
          >
            Thêm câu hỏi
          </Button>
        </div>
      </Spin>
      <Tooltip title="Thêm tất cả" placement="top">
        <FloatButton
          onClick={handleSubmit}
          className="w-[50px] h-[50px] shadow-md "
          type="primary"
          style={{ insetInlineEnd: 44 }}
          icon={<FolderPlus />}
        />
      </Tooltip>
    </DashboardLayout>
  );
}

export default QuestionModify;
