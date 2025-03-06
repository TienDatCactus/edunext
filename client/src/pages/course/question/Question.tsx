import QuestionMarkdown from "../../../ui/_elements/Markdown/QuestionMarkdown";
import QuestionLayout from "../../../ui/layouts/QuestionLayout";

import { Tabs, TabsProps } from "antd";
import Group from "./sub_elements/LessonGroups";
import { useQuestionStore } from "../../../utils/zustand/Store";
import { CodeEditor } from "../../../ui/_elements/Markdown/CodeEditor";
import QuizEditor from "../../../ui/_elements/Markdown/QuizEditor";
import StudentsAnswers from "./sub_elements/StudentsAnswers";

const Question = () => {
  const { question } = useQuestionStore();
  const type = question?.type;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Trả lời câu hỏi",
      children:
        type == "response" ? (
          <QuestionMarkdown />
        ) : type == "code" ? (
          <CodeEditor />
        ) : type == "quiz" ? (
          <QuizEditor question={question} />
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
