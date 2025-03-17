import { Tabs, TabsProps } from "antd";
import { useLocation } from "react-router-dom";
import { useQuestionStore } from "../../../utils/zustand/Store";
import { Question as QuestionType } from "../../../utils/interfaces";
import QuestionLayout from "../../../ui/layouts/QuestionLayout";
import QuestionMarkdown from "../../../ui/_elements/Markdown/QuestionMarkdown";
import { CodeEditor } from "../../../ui/_elements/Markdown/CodeEditor";
import QuizEditor from "../../../ui/_elements/Markdown/QuizEditor";
import StudentsAnswers from "./sub_elements/StudentsAnswers";
import Group from "./sub_elements/LessonGroups";

const Question = () => {
  const { question } = useQuestionStore();
  const { state } = useLocation();
  const type = question?.type;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Trả lời câu hỏi",
      children:
        type === "response" ? (
          <QuestionMarkdown qId={state?.questionId} lId={state?.lessonId} />
        ) : type === "code" ? (
          <CodeEditor qId={state?.questionId} lId={state?.lessonId} />
        ) : type === "quiz" && question ? (
          <QuizEditor
            question={question}
            qId={state?.questionId}
            lId={state?.lessonId}
          />
        ) : null,
    },
    {
      key: "2",
      label: "Nhóm lớp",
      children: <Group />,
    },
    {
      key: "3",
      label: "Các câu trả lời",
      children: <StudentsAnswers />,
    },
  ];

  return (
    <QuestionLayout>
      <Tabs
        defaultActiveKey="1"
        items={items}
        animated
        centered
        className="px-4 py-1 bg-white border rounded-lg shadow-lg"
      />
    </QuestionLayout>
  );
};

export default Question;
