import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import {
  BoxArrowUp,
  CaretDown,
  CheckSquareOffset,
  Circle,
  CodeBlock,
  DotsSixVertical,
  DotsThreeOutline,
  MonitorArrowUp,
  Paragraph,
  Plus,
  QuestionMark,
  Timer,
  Trash,
} from "@phosphor-icons/react";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Form,
  FormProps,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { QuestionQuizContent } from "../../../../../utils/interfaces";
import { FieldType } from "../../Access/LoginForm";

const { Option } = Select;

function QuestionAddForm({ prop }: { prop: any }) {
  console.log(prop);
  console.log(prop.type == "quiz");
  const ref = React.useRef<MDXEditorMethods>(null);
  const [md, setMd] = useState<string>(
    prop?.content || prop?.question?.content || "" || "" || ""
  );
  const [type, setType] = useState("");

  const handleChange = (value: string) => {
    setType(value);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const [answers, setAnswers] = useState<
    string | QuestionQuizContent | string[]
  >(prop?.answer || ["Answer 1", "Answer 2"]);

  const [isMultipleAnswers, setIsMultipleAnswers] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null | undefined>(
    null
  );
  const addAnswer = (): void => {
    if (Array.isArray(answers)) {
      setAnswers([...answers, `New Answer ${answers.length + 1}`]);
    }
  };

  const deleteAnswer = (index: number): void => {
    if (Array.isArray(answers)) {
      const newAnswers = answers.filter((_, i) => i !== index);
      setAnswers(newAnswers);
    }
  };

  const updateAnswer = (index: number, newAnswer: string) => {
    if (Array.isArray(answers)) {
      const updatedAnswers = [...answers];
      updatedAnswers[index] = newAnswer;
      setAnswers(updatedAnswers);
    }
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleEditorChange = (newMarkdown: string) => {
    setMd(newMarkdown);
  };

  const handleSubmit = () => {
    let question;
    if (type === "quiz") {
      question = {
        content: {
          title: md,
          answers: answers,
          correctAnswer: correctAnswer,
        },
        lessonId: prop.lessonId,
        status: false,
        type: type,
      };
    } else {
      question = {
        content: md,
        lessonId: prop.lessonId,
        status: false,
        type: type,
      };
    }

    prop.addQuestion(question, prop.index);
  };
  return (
    <Badge.Ribbon text={`#${prop?.id || prop?.index}`} placement="start">
      <div className="min-h-[550px] border rounded-md p-[20px] bg-white">
        <div className="flex items-center justify-between mt-4">
          <Select
            defaultValue={prop?.question?.type || "quiz"}
            onChange={handleChange}
            suffixIcon={<CaretDown weight="bold" color="black" />}
            className="[&_.ant-select-selector]:border-[0px] [&_.ant-select-selector]:bg-[#f6f6f6] [&_.ant-select-selector]:rounded-md w-36"
            options={[
              {
                value: "quiz",
                disabled:
                  prop?.question?.type && prop?.question?.type !== "quiz",
                label: (
                  <div className="flex items-center gap-1">
                    <CheckSquareOffset weight="bold" />
                    <p className="font-semibold">Trắc nghiệm</p>
                  </div>
                ),
              },
              {
                value: "response",
                disabled:
                  prop?.question?.type && prop?.question?.type != "response",
                label: (
                  <div className="flex items-center gap-1">
                    <Paragraph weight="bold" />
                    <p className="font-semibold">Tự luận</p>
                  </div>
                ),
              },
              {
                value: "code",
                disabled: prop?.type && prop?.type != "code",
                label: (
                  <div className="flex items-center gap-1 *:font-semibold">
                    <CodeBlock weight="bold" />
                    <p className="font-semibold">Lập trình</p>
                  </div>
                ),
              },
            ]}
          />

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <h1 className="font-medium text-[1rem]">Bắt buộc</h1>
              <Switch size="default" defaultChecked onChange={onChange} />
            </div>
            <Button icon={<DotsThreeOutline weight="fill" size={16} />} />
          </div>
        </div>
        <Divider className="border-[#ccc] my-4" />
        <div className="flex items-center gap-1 mb-4">
          <QuestionMark size={22} weight="fill" />
          <strong>
            Câu hỏi #{prop?.id ? prop?.id?.substring(0, 4) : prop?.index}{" "}
            <span className="text-[red]">*</span>
          </strong>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="grid grid-cols-12 gap-2">
            <Form.Item
              className={`${
                prop?.type != "quiz" ? "col-span-8" : "col-span-12"
              }`}
            >
              <MDXEditor
                markdown={md}
                className="p-2 border-[#ccc] border rounded-md shadow-md"
                contentEditableClassName="min-h-[180px]"
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
                onChange={handleEditorChange}
              />
            </Form.Item>
            {prop?.type != "quiz" && (
              <Form.Item className="col-span-4 ">
                <Dragger className="group">
                  <div className="flex justify-center">
                    <BoxArrowUp
                      size={40}
                      className=" group-hover:text-[#1688ff]"
                    />
                  </div>
                  <p className="ant-upload-text group-hover:text-[#1688ff]">
                    Nhấp hoặc kéo tệp vào khu vực này để tải lên
                  </p>
                  <p className="ant-upload-hint  text-[12px]">
                    Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải lên dữ
                    liệu công ty hoặc các tệp bị cấm khác.
                  </p>
                </Dragger>
              </Form.Item>
            )}
          </div>
          <div className="flex items-center my-4">
            <div>
              Lựa chọn<span className="text-[red]">*</span>
            </div>
            <Divider
              type="vertical"
              style={{ borderWidth: 1, height: 20, margin: "0 20px" }}
            />
            <div>
              <span>Nhiều câu trả lời</span>
              <Switch
                defaultChecked={isMultipleAnswers}
                onChange={(checked) => setIsMultipleAnswers(checked)}
                className="mx-[10px]"
              />
            </div>
          </div>
          {(prop?.type == "quiz" ||
            prop?.question?.type == "quiz" ||
            type === "quiz") && (
            <div className="my-[20px]">
              <Form.Item>
                {isMultipleAnswers ? (
                  <Checkbox.Group
                    className="block w-full space-y-2"
                    children={
                      Array.isArray(answers) &&
                      answers.map((answer, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md shadow-sm bg-gray-50"
                        >
                          <Checkbox
                            className="w-full"
                            checked={index == prop?.correct}
                          >
                            <Input
                              className="w-full border-0 bg-gray-50 dm-sans"
                              value={answer}
                              onChange={(e) =>
                                updateAnswer(index, e.target.value)
                              }
                            />
                          </Checkbox>
                          <div className="flex items-center space-x-2">
                            <DotsSixVertical
                              className="text-gray-400 cursor-move"
                              size={20}
                            />
                            <Trash
                              className="text-red-500 cursor-pointer"
                              size={20}
                              onClick={() => deleteAnswer(index)}
                            />
                          </div>
                        </div>
                      ))
                    }
                  />
                ) : (
                  <Radio.Group
                    className="w-full space-y-2"
                    value={
                      Array.isArray(answers)
                        ? answers[prop?.correct]
                        : undefined
                    }
                    onChange={(e) => {
                      const selectedAnswer = e.target.value;
                      const selectedIndex = Array.isArray(answers)
                        ? answers.findIndex((ans) => ans === selectedAnswer)
                        : null;
                      prop.correct = selectedIndex;
                      setCorrectAnswer(
                        selectedIndex !== -1 ? selectedIndex : null
                      );
                    }}
                    children={
                      Array.isArray(answers) &&
                      answers.map((answer, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-md shadow-sm bg-gray-50"
                          >
                            <Radio
                              checked={index == prop?.correct}
                              value={answer}
                            >
                              <Input
                                value={answer}
                                className="w-full border-0 bg-gray-50 dm-sans"
                                onChange={(e) =>
                                  updateAnswer(index, e.target.value)
                                }
                              />
                            </Radio>
                            <div className="flex items-center space-x-2">
                              <DotsSixVertical
                                className="text-gray-400 cursor-move"
                                size={20}
                              />
                              <Trash
                                className="text-red-500 cursor-pointer"
                                size={20}
                                onClick={() => deleteAnswer(index)}
                              />
                            </div>
                          </div>
                        );
                      })
                    }
                  />
                )}
              </Form.Item>
              <div className="flex items-center justify-between">
                <Button
                  type="dashed"
                  onClick={addAnswer}
                  icon={<Plus size={16} />}
                >
                  Thêm lựa chọn
                </Button>
                <Button type="primary" icon={<MonitorArrowUp size={16} />}>
                  {prop ? "Cập nhật" : "Thêm câu hỏi"}
                </Button>
              </div>
            </div>
          )}
          <Divider className="border-[#ccc]" />
        </Form>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col mr-[20px]">
              <label className="text-sm font-medium">Sắp xếp</label>
              <Select
                defaultValue="Giữ các lựa chọn theo thứ tự hiện tại"
                className="w-100"
              >
                <Option value="keep">
                  Giữ các lựa chọn theo thứ tự hiện tại
                </Option>
                <Option value="random">Lựa chọn ngẫu nhiên</Option>
              </Select>
            </div>

            <div className="flex flex-col mr-[20px]">
              <label className="text-sm font-medium">Thời gian ước tính</label>
              <div className="flex items-center gap-2 border rounded-lg bg-gray-50">
                <InputNumber
                  min={0}
                  defaultValue={2}
                  className="w-16 bg-transparent border-none"
                />
                <span className="text-gray-500">phút</span>
                <Timer size={20} className="text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Số điểm</label>
              <div className="flex items-center gap-2 border rounded-lg bg-gray-50">
                <InputNumber
                  min={0}
                  defaultValue={1}
                  className="w-16 bg-transparent border-none"
                />
                <span className="text-gray-500">điểm</span>
                <Circle size={20} weight="fill" className="text-yellow-400" />
              </div>
            </div>
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              type="primary"
              icon={<MonitorArrowUp size={20} />}
            >
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </Badge.Ribbon>
  );
}

export default QuestionAddForm;
