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
import {
  BoxArrowUp,
  CaretDown,
  CheckSquareOffset,
  Circle,
  CodeBlock,
  DotsSixVertical,
  DotsThreeOutline,
  FolderPlus,
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
  Input,
  InputNumber,
  message,
  Popover,
  Radio,
  Select,
  Spin,
  Steps,
  StepsProps,
  Switch,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateQuestionByTeacher } from "../../../../../utils/api";
import { QuestionQuizContent } from "../../../../../utils/interfaces";
import { debounce } from "../../../../../utils/customHooks";

const { Option } = Select;

interface TestCase {
  input: string;
  expectedOutput: string;
}

function QuestionAddForm({ prop }: { prop: any }) {
  const ref = React.useRef<MDXEditorMethods>(null);
  const [md, setMd] = useState<string>(
    typeof (prop?.content || prop?.question?.content) === "string"
      ? prop?.content || prop?.question?.content || ""
      : ""
  );
  console.log(prop);
  const navigate = useNavigate();
  const [type, setType] = useState("quiz");
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "", expectedOutput: "" },
  ]);

  useEffect(() => {
    if (prop?.question?.content) {
      const content = prop.question.content;
      if (typeof content === "object" && "cases" in content) {
        const cases = content.cases || [];
        setTestCases(
          Array.isArray(cases) && cases.length > 0
            ? cases.map((item: any) => ({
                input: item.input || "",
                expectedOutput: item.expectedOutput || "",
              }))
            : [{ input: "", expectedOutput: "" }]
        );
      }
    }
  }, [prop?.question]);

  useEffect(() => {
    if (prop?.question?.type) {
      setType(prop?.question?.type);
    }
  }, [prop]);

  const onChanges = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  const handleChange = (value: string) => {
    setType(value);
  };

  const [answers, setAnswers] = useState<
    string | QuestionQuizContent | string[]
  >(prop?.question?.content[0]?.answers || ["Answer 1", "Answer 2"]);

  const [isMultipleAnswers, setIsMultipleAnswers] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null | undefined>(
    null
  );

  const customDot: StepsProps["progressDot"] = (dot, { status, index }) => {
    switch (index) {
      case 0:
        return <Popover content="Ấn để lưu câu hỏi vào bộ nhớ">{dot}</Popover>;
      case 1:
        return <Popover content="Thêm câu hỏi vào hệ thống">{dot}</Popover>;
      default:
        return dot;
    }
  };

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
  const updateAnswer = (index: number, newValue: string) => {
    if (Array.isArray(answers)) {
      setAnswers((prevAnswers) => {
        const updatedAnswers = Array.isArray(prevAnswers)
          ? [...prevAnswers]
          : [];
        updatedAnswers[index] = newValue;
        console.log("Updated Answers:", updatedAnswers);
        return updatedAnswers;
      });
    }
  };
  useEffect(() => {
    if (prop.answers) {
      setAnswers(prop.answers);
    }
  }, [prop.answers]);

  const handleEditorChange = debounce((newMarkdown: string) => {
    setMd(newMarkdown);
  }, 300);

  const handleSubmit = () => {
    setCurrent(1);
    let question = {};
    if (type === "quiz") {
      question = {
        content: [
          {
            title: md,
            answers: answers,
            correctAnswer: correctAnswer,
          },
        ],
        lesson: prop.lessonId,
        status: false,
        type: type,
      };
    } else if (type === "code") {
      question = {
        content: { cases: [...testCases] },
        lesson: prop.lessonId,
        status: false,
        type: type,
      };
    } else {
      question = {
        content: md,
        lesson: prop.lessonId,
        status: false,
        type: type,
      };
    }
    console.log(question);
    prop.addQuestion(question, prop.index);
  };

  const handleUpdateQuestion = async () => {
    let question = {};
    if (type === "quiz") {
      question = {
        content: [
          {
            title: md,
            answers: answers,
            correctAnswer: correctAnswer,
          },
        ],
        status: prop.question.status,
        type: prop.question.type,
      };
    } else if (type === "code") {
      question = {
        content: { cases: [...testCases] },
        lesson: prop.lessonId,
        status: false,
        type: type,
      };
    } else {
      question = {
        content: md,
        status: prop.question.status,
        type: prop.question.type,
      };
    }

    try {
      setLoading(true);
      const resp = await updateQuestionByTeacher(prop.question.id, question);
      if (resp) {
        message.success("Cập nhật câu hỏi thành công");
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

  const debouncedUpdate = debounce(handleUpdateQuestion, 1000);

  console.log(testCases);
  const FormCheck: React.FC = () => {
    switch (type) {
      case "quiz":
        return (
          <Spin spinning={loading}>
            <Badge.Ribbon text={`#${prop?.question?._id}`} placement="start">
              <div className="min-h-[550px] border rounded-md p-[20px] bg-white">
                <div className="flex items-center justify-between mt-4">
                  <Select
                    defaultValue={type}
                    onChange={handleChange}
                    suffixIcon={<CaretDown weight="bold" color="black" />}
                    className="[&_.ant-select-selector]:border-[0px] [&_.ant-select-selector]:bg-[#f6f6f6] [&_.ant-select-selector]:rounded-md w-36"
                    options={[
                      {
                        value: "quiz",
                        label: (
                          <div className="flex items-center gap-1">
                            <CheckSquareOffset weight="bold" />
                            <p className="font-semibold">Trắc nghiệm</p>
                          </div>
                        ),
                      },
                      {
                        value: "response",
                        disabled: true,
                        label: (
                          <div className="flex items-center gap-1">
                            <Paragraph weight="bold" />
                            <p className="font-semibold">Tự luận</p>
                          </div>
                        ),
                      },
                      {
                        value: "code",
                        disabled: true,
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
                      <Switch size="default" defaultChecked />
                    </div>
                    <Button
                      icon={<DotsThreeOutline weight="fill" size={16} />}
                    />
                  </div>
                </div>
                <Divider className="border-[#ccc] my-4" />
                <div className="flex items-center gap-1 mb-4">
                  <QuestionMark size={22} weight="fill" />
                  <strong>
                    Câu hỏi #
                    {prop?.id ? prop?.id?.substring(0, 4) : prop?.index}{" "}
                    <span className="text-[red]">*</span>
                  </strong>
                </div>
                <Form initialValues={{ remember: true }} autoComplete="off">
                  <div className="grid grid-cols-12 gap-2">
                    <Form.Item className="col-span-12">
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
                              ? answers.findIndex(
                                  (ans) => ans === selectedAnswer
                                )
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
                      {prop?.question?._id && (
                        <Button
                          type="primary"
                          icon={<MonitorArrowUp size={16} />}
                          onClick={handleUpdateQuestion}
                        >
                          Cập nhật
                        </Button>
                      )}
                    </div>
                  </div>

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
                      <label className="text-sm font-medium">
                        Thời gian ước tính
                      </label>
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
                        <Circle
                          size={20}
                          weight="fill"
                          className="text-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                  {!prop?.question?._id && (
                    <Steps
                      current={current}
                      onChange={onChanges}
                      progressDot={customDot}
                      items={[
                        {
                          title: (
                            <Button
                              onClick={handleSubmit}
                              type="primary"
                              icon={<MonitorArrowUp size={20} />}
                            >
                              Lưu
                            </Button>
                          ),
                        },
                        {
                          title: (
                            <Button
                              disabled={current != 1}
                              onClick={prop?.handleSubmit}
                              type="primary"
                              icon={<FolderPlus size={20} />}
                            >
                              Thêm mới
                            </Button>
                          ),
                        },
                      ]}
                    />
                  )}
                </div>
              </div>
            </Badge.Ribbon>
          </Spin>
        );
      case "response":
        return (
          <Spin spinning={loading}>
            <Badge.Ribbon text={`#${prop?.question?._id}`} placement="start">
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
                          prop?.question?.type &&
                          prop?.question?.type !== "quiz",
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
                          prop?.question?.type &&
                          prop?.question?.type != "response",
                        label: (
                          <div className="flex items-center gap-1">
                            <Paragraph weight="bold" />
                            <p className="font-semibold">Tự luận</p>
                          </div>
                        ),
                      },
                      {
                        value: "code",
                        disabled:
                          prop?.question?.type &&
                          prop?.question?.type != "code",
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
                      <Switch size="default" defaultChecked />
                    </div>
                    <Button
                      icon={<DotsThreeOutline weight="fill" size={16} />}
                    />
                  </div>
                </div>
                <Divider className="border-[#ccc] my-4" />
                <div className="flex items-center gap-1 mb-4">
                  <QuestionMark size={22} weight="fill" />
                  <strong>
                    Câu hỏi #
                    {prop?.id ? prop?.id?.substring(0, 4) : prop?.index}{" "}
                    <span className="text-[red]">*</span>
                  </strong>
                </div>
                <Form initialValues={{ remember: true }} autoComplete="off">
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
                          Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải
                          lên dữ liệu công ty hoặc các tệp bị cấm khác.
                        </p>
                      </Dragger>
                    </Form.Item>
                  </div>
                  <Button
                    type="primary"
                    icon={<MonitorArrowUp size={16} />}
                    onClick={handleUpdateQuestion}
                  >
                    Cập nhật
                  </Button>
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
                      <label className="text-sm font-medium">
                        Thời gian ước tính
                      </label>
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
                        <Circle
                          size={20}
                          weight="fill"
                          className="text-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                  <Steps
                    current={current}
                    onChange={onChanges}
                    progressDot={customDot}
                    items={[
                      {
                        title: (
                          <Button
                            onClick={handleSubmit}
                            type="primary"
                            icon={<MonitorArrowUp size={20} />}
                          >
                            Lưu
                          </Button>
                        ),
                      },
                      {
                        title: (
                          <Button
                            disabled={current != 1}
                            onClick={prop?.handleSubmit}
                            type="primary"
                            icon={<FolderPlus size={20} />}
                          >
                            Thêm mới
                          </Button>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            </Badge.Ribbon>
          </Spin>
        );
      case "code":
        return (
          <Spin spinning={loading}>
            <Badge.Ribbon text={`#${prop?.question?._id}`} placement="start">
              <div className="min-h-[550px] border rounded-md p-[20px] bg-white">
                <div className="flex items-center justify-between mt-4">
                  <Select
                    defaultValue={type}
                    onChange={handleChange}
                    suffixIcon={<CaretDown weight="bold" color="black" />}
                    className="[&_.ant-select-selector]:border-[0px] [&_.ant-select-selector]:bg-[#f6f6f6] [&_.ant-select-selector]:rounded-md w-36"
                    options={[
                      {
                        value: "quiz",
                        disabled: true,
                        label: (
                          <div className="flex items-center gap-1">
                            <CheckSquareOffset weight="bold" />
                            <p className="font-semibold">Trắc nghiệm</p>
                          </div>
                        ),
                      },
                      {
                        value: "response",
                        disabled: true,
                        label: (
                          <div className="flex items-center gap-1">
                            <Paragraph weight="bold" />
                            <p className="font-semibold">Tự luận</p>
                          </div>
                        ),
                      },
                      {
                        value: "code",
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
                      <Switch size="default" defaultChecked />
                    </div>
                    <Button
                      icon={<DotsThreeOutline weight="fill" size={16} />}
                    />
                  </div>
                </div>
                <Divider className="border-[#ccc] my-4" />
                <div className="flex items-center gap-1 mb-4">
                  <QuestionMark size={22} weight="fill" />
                  <strong>
                    Câu hỏi #
                    {prop?.question?._id &&
                      prop?.question?._id?.substring(0, 4)}
                    <span className="text-[red]">*</span>
                  </strong>
                </div>
                <Form initialValues={{ remember: true }} autoComplete="off">
                  <div className="grid grid-cols-12 gap-2">
                    <Form.Item className="col-span-12">
                      <div className="space-y-4">
                        <div className="space-y-4">
                          {testCases.map((testCase, index) => (
                            <>
                              <div key={index} className="">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center w-6 h-6 text-blue-600 bg-blue-100 rounded-full">
                                      {index + 1}
                                    </div>
                                    <h4 className="font-medium">
                                      Test Case {index + 1}
                                    </h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      type="text"
                                      danger
                                      icon={<Trash size={16} />}
                                      onClick={() => {
                                        const newTestCases = testCases.filter(
                                          (_, i) => i !== index
                                        );
                                        setTestCases(newTestCases);
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                      Dữ liệu đầu vào
                                    </label>
                                    <Input
                                      value={testCase.input}
                                      onChange={(e) => {
                                        const newTestCases = [...testCases];
                                        newTestCases[index].input =
                                          e.target.value;
                                        setTestCases(newTestCases);
                                      }}
                                      placeholder="Nhập..."
                                      className="font-mono h-14"
                                    />
                                  </div>
                                  <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                      Kết quả mong đợi
                                    </label>
                                    <Input
                                      value={testCase.expectedOutput}
                                      onChange={(e) => {
                                        const newTestCases = [...testCases];
                                        newTestCases[index].expectedOutput =
                                          e.target.value;
                                        setTestCases(newTestCases);
                                      }}
                                      placeholder="Nhập..."
                                      className="font-mono h-14"
                                    />
                                  </div>
                                </div>
                              </div>

                              <Divider className="my-2 border-[#d9d9d9]" />
                            </>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <Button
                            type="primary"
                            icon={<Plus size={16} />}
                            onClick={() => {
                              const newTestCases = [
                                ...testCases,
                                {
                                  input: "",
                                  expectedOutput: "",
                                  isHidden: false,
                                },
                              ];
                              setTestCases(newTestCases);
                            }}
                          >
                            Thêm test case
                          </Button>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="primary"
                      icon={<MonitorArrowUp size={16} />}
                      onClick={handleUpdateQuestion}
                    >
                      Cập nhật
                    </Button>
                  </div>

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
                      <label className="text-sm font-medium">
                        Thời gian ước tính
                      </label>
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
                        <Circle
                          size={20}
                          weight="fill"
                          className="text-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Badge.Ribbon>
          </Spin>
        );
      default:
        return <Spin spinning />;
    }
  };
  return prop?.question ? (
    <FormCheck />
  ) : (
    <Spin spinning={loading}>
      <Badge.Ribbon text={`#${prop?.index}`} placement="start">
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
                  label: (
                    <div className="flex items-center gap-1">
                      <CheckSquareOffset weight="bold" />
                      <p className="font-semibold">Trắc nghiệm</p>
                    </div>
                  ),
                },
                {
                  value: "response",
                  label: (
                    <div className="flex items-center gap-1">
                      <Paragraph weight="bold" />
                      <p className="font-semibold">Tự luận</p>
                    </div>
                  ),
                },
                {
                  value: "code",
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
                <Switch size="default" defaultChecked />
              </div>
              <Button icon={<DotsThreeOutline weight="fill" size={16} />} />
            </div>
          </div>
          <Divider className="border-[#ccc] my-4" />
          <div className="flex items-center gap-1 mb-4">
            <QuestionMark size={22} weight="fill" />
            <strong>
              Câu hỏi #{prop?.index}
              <span className="text-[red]">*</span>
            </strong>
          </div>
          <Form initialValues={{ remember: true }} autoComplete="off">
            <div className="grid grid-cols-12 gap-2">
              <Form.Item
                className={`${
                  type == "response" ? "col-span-8" : "col-span-12"
                }`}
              >
                {type == "code" ? (
                  <div className="space-y-4 min-h-[300px]">
                    <div className="space-y-4">
                      {testCases.map((testCase, index) => (
                        <div key={index}>
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-6 h-6 text-blue-600 bg-blue-100 rounded-full">
                                  {index + 1}
                                </div>
                                <h4 className="font-medium">
                                  Test Case {index + 1}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="text"
                                  danger
                                  icon={<Trash size={16} />}
                                  onClick={() => {
                                    const newTestCases = testCases.filter(
                                      (_, i) => i !== index
                                    );
                                    setTestCases(newTestCases);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                  Dữ liệu đầu vào
                                </label>
                                <Input
                                  value={testCase.input}
                                  onChange={(e) => {
                                    const newTestCases = [...testCases];
                                    newTestCases[index].input = e.target.value;
                                    setTestCases(newTestCases);
                                  }}
                                  placeholder="Nhập..."
                                  className="font-mono h-14"
                                />
                              </div>
                              <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                  Kết quả mong đợi
                                </label>
                                <Input
                                  value={testCase.expectedOutput}
                                  onChange={(e) => {
                                    const newTestCases = [...testCases];
                                    newTestCases[index].expectedOutput =
                                      e.target.value;
                                    setTestCases(newTestCases);
                                  }}
                                  placeholder="Nhập..."
                                  className="font-mono h-14"
                                />
                              </div>
                            </div>
                          </div>

                          <Divider className="my-2 border-[#d9d9d9]" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        type="primary"
                        icon={<Plus size={16} />}
                        onClick={() => {
                          const newTestCases = [
                            ...testCases,
                            {
                              input: "",
                              expectedOutput: "",
                              isHidden: false,
                            },
                          ];
                          setTestCases(newTestCases);
                        }}
                      >
                        Thêm test case
                      </Button>
                    </div>
                  </div>
                ) : (
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
                )}
              </Form.Item>
              {type == "response" && (
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
                      Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải lên
                      dữ liệu công ty hoặc các tệp bị cấm khác.
                    </p>
                  </Dragger>
                </Form.Item>
              )}
            </div>
            {type == "quiz" && (
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
            )}
            {type == "quiz" && (
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
                  {prop?.question?._id && (
                    <Button
                      type="primary"
                      icon={<MonitorArrowUp size={16} />}
                      onClick={handleUpdateQuestion}
                    >
                      Cập nhật
                    </Button>
                  )}
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
                <label className="text-sm font-medium">
                  Thời gian ước tính
                </label>
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
            <Steps
              current={current}
              onChange={onChanges}
              progressDot={customDot}
              items={[
                {
                  title: (
                    <Button
                      onClick={handleSubmit}
                      type="primary"
                      icon={<MonitorArrowUp size={20} />}
                    >
                      Lưu
                    </Button>
                  ),
                },
                {
                  title: (
                    <Button
                      disabled={current != 1}
                      onClick={prop?.handleSubmit}
                      type="primary"
                      icon={<FolderPlus size={20} />}
                    >
                      Thêm mới
                    </Button>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Badge.Ribbon>
    </Spin>
  );
}

export default QuestionAddForm;
