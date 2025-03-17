import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { Button, Divider, Form, FormProps, message, Spin } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { postQuestionSubmission } from "../../../utils/api";

interface QuestionMarkdownProps {
  qId?: string;
  lId?: string;
}

const QuestionMarkdown: React.FC<QuestionMarkdownProps> = ({ qId }) => {
  const ref = React.useRef<MDXEditorMethods>(null);
  const [md, setMd] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();
  const questionId = location.state?.questionId as string;

  const onFinish: FormProps<{
    content?: string;
  }>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const resp = await postQuestionSubmission(qId, values?.content);
      if (resp?.isOk) {
        message.success("Nộp bài làm thành công !");
      }
    } catch (error) {
      message.error("Gặp lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<{
    content?: string;
  }>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Spin spinning={loading}>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item<{
          content?: string;
        }>
          name="content"
          rules={[{ required: true, message: "Please input your answer!" }]}
        >
          <MDXEditor
            markdown={md}
            className="p-2 rounded-md shadow-md"
            contentEditableClassName=" min-h-[180px]"
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              thematicBreakPlugin(),
              quotePlugin(),
              linkPlugin(),
              linkDialogPlugin(),
              thematicBreakPlugin(),
              diffSourcePlugin(),
              imagePlugin(),
              tablePlugin(),
              toolbarPlugin({
                toolbarClassName: "my-classname",
                toolbarContents: () => (
                  <>
                    <BlockTypeSelect />
                    <CodeToggle />
                    <InsertImage />
                    <InsertTable />
                    <InsertThematicBreak />
                    <ListsToggle />
                    <BoldItalicUnderlineToggles />
                  </>
                ),
              }),
            ]}
            ref={ref}
          />
        </Form.Item>
        <div className="flex justify-end gap-3">
          <Button onClick={() => ref.current?.setMarkdown("")}>Xóa</Button>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Gửi câu trả lời
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Divider className="border-[#ccc] text-[12px] font-light m-0" />
    </Spin>
  );
};

export default QuestionMarkdown;
