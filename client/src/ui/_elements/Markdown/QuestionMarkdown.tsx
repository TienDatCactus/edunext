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
import { ArrowsDownUp, CaretCircleDown } from "@phosphor-icons/react";
import {
  Button,
  Divider,
  Dropdown,
  Empty,
  Form,
  FormProps,
  MenuProps,
  message,
  Spin,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getQuestionSubmission,
  postQuestionSubmission,
} from "../../../utils/api";
import { SubmissionItem } from "../../../utils/interfaces";
import Answer from "../Page/Course/Lesson/Question/Answer";
const QuestionMarkdown: React.FC = () => {
  const ref = React.useRef<MDXEditorMethods>(null);
  const [md, setMd] = useState<string>("");
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <ArrowsDownUp size={22} />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  const location = useLocation();
  const questionId = location.state?.questionId as string;
  const [allSubmissions, setAllSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getSubmissions = async () => {
    try {
      setLoading(true);
      const resp = await getQuestionSubmission(questionId || "");
      if (resp?.isOk) {
        setAllSubmissions(resp?.submissions);
      }
    } catch (error) {
      message.error("Gặp lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  const onFinish: FormProps<{
    content?: string;
  }>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const resp = await postQuestionSubmission(questionId, values?.content);
      if (resp?.isOk) {
        setAllSubmissions(resp?.allSubmission);
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

  useEffect(() => {
    return () => {
      getSubmissions();
    };
  }, []);
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
      <div className="min-h-[200px] pt-6 pb-6 flex flex-col gap-10">
        <div className="flex justify-between">
          <div className="flex gap-2 place-items-start">
            <p className="text-[20px] font-bold">Các câu trả lời</p>
            <Tag className="rounded-full bg-[#fde1ac] border-none text-[#4d4d4d] code">
              {allSubmissions?.length}
            </Tag>
          </div>
          <Dropdown menu={{ items }} arrow trigger={["click"]}>
            <div className="flex items-center justify-center gap-1 cursor-pointer">
              <ArrowsDownUp size={18} />
              <p className="text-[14px] ">Gần đây nhất</p>
              <CaretCircleDown size={18} />
            </div>
          </Dropdown>
        </div>
        <ul className="flex flex-col gap-4">
          {allSubmissions?.length == 0 && (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
              description={
                <p className="py-2 text-[16px]">Chưa có câu trả lời nào</p>
              }
            />
          )}
          {!!allSubmissions.length &&
            allSubmissions?.map((submission, index) => (
              <Answer
                _id={submission?._id}
                key={index}
                content={submission?.content}
                createdAt={submission?.createdAt}
                user={submission?.user}
                comments={submission?.comments}
                setLoading={setLoading}
                setAllSubmissions={setAllSubmissions}
              />
            ))}
        </ul>
      </div>
    </Spin>
  );
};

export default QuestionMarkdown;
