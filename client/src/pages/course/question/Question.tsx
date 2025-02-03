import QuestionMarkdown from "../../../ui/_elements/Markdown/QuestionMarkdown";
import QuestionLayout from "../../../ui/layouts/QuestionLayout";

import { Tabs, TabsProps } from "antd";
import Group from "./sub_elements/Group";
import { useQuestionStore } from "../../../utils/zustand/Store";
import { CodeEditor } from "../../../ui/_elements/Markdown/CodeEditor";

const Question = () => {
  const { question } = useQuestionStore();
  const type = question?.type;
  console.log(type);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Trả lời câu hỏi",
      children:
        type == "response" ? (
          <QuestionMarkdown />
        ) : type == "code" ? (
          <CodeEditor />
        ) : null,
    },
    {
      key: "2",
      label: "Nhóm",
      children: <Group />,
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
