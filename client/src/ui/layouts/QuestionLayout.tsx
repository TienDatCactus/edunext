import {
  Badge,
  Breadcrumb,
  Button,
  DatePicker,
  Divider,
  Form,
  Popconfirm,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentSeason } from "../../utils/customHooks";
import {
  useCodeStore,
  useCourseStore,
  useQuestionStore,
  useUserStore,
} from "../../utils/zustand/Store";
import QuestionSidebar from "../_elements/Layout/QuestionSidebar";
import MainLayout from "./MainLayout";

const format = "HH:mm:ss";
const QuestionLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [form] = Form.useForm();
  const year = dayjs().year().toString();
  const month = getCurrentSeason();
  const { detail } = useCourseStore();
  const location = useLocation();
  const questionId = location.state?.questionId;
  const { fetchQuestionById, question, loading } = useQuestionStore();
  const { user } = useUserStore();
  const [dataSource, setDataSource] = useState<
    { key: number; input: any; output: any; status: string }[]
  >([]);
  console.log(question);

  const { actualOutput, codeloading } = useCodeStore();
  const swapper = {
    quiz: "Trắc nghiệm",
    code: "Lập trình",
    response: "Tự luận",
  };
  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

  useEffect(() => {
    fetchQuestionById(questionId);
  }, [questionId]);

  const onFinish = (values: any) => {
    console.log(values.date.$d.toISOString());
    console.log(values.time);
  };
  const columns: TableColumnsType = [
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
      render: (text: any) => (
        <p className="text-[0.875rem] whitespace-pre-wrap font-mono">{text}</p>
      ),
    },
    {
      title: "Output",
      dataIndex: "output",
      key: "output",
      render: (text: any) => (
        <p className="text-[0.875rem] whitespace-pre-wrap font-mono">{text}</p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text: any) => (
        <Spin spinning={codeloading}>
          <Tag
            color={`${
              text == "Đúng" ? "green" : text == "Sai" ? "red" : "yellow"
            }`}
            className="font-mono"
          >
            {text}
          </Tag>
        </Spin>
      ),
    },
  ];

  useEffect(() => {
    setDataSource(
      typeof question?.content === "object" &&
        "cases" in question?.content &&
        Array.isArray(question?.content?.cases)
        ? question?.content?.cases?.map((item: any, index: number) => ({
            key: index,
            input: item.input,
            output: item.expectedOutput,
            status:
              actualOutput?.[index]?.actualOutput == item.expectedOutput
                ? "Đúng"
                : actualOutput?.[index]?.actualOutput === undefined
                ? "Chưa kiểm tra"
                : "Sai",
          }))
        : []
    );
  }, [question, actualOutput]);

  return (
    <MainLayout>
      <Spin spinning={loading}>
        <div className="grid justify-around grid-cols-12 gap-4 px-8 min-h-[800px]">
          <div className="col-span-8">
            <div>
              <Breadcrumb
                items={[
                  {
                    title: <a href="/">Trang chủ</a>,
                  },
                  {
                    title: <a href={`/home/${year}/${month}`}>Môn học</a>,
                  },
                  {
                    title: <p className="code">{questionId}</p>,
                  },
                ]}
              />
              <div className="p-4 my-4 bg-white border rounded-md shadow-md -fadeInLeft">
                <h1 className="font-semibold text-[20px]">
                  Câu hỏi dạng {swapper[question?.type || "code"]}
                </h1>
                <Divider className="border-[#868686] my-3" />
                {question?.type === "code" && (
                  <div className="bg-[#f5f5f5] my-4 p-2 rounded-md">
                    <Table
                      pagination={false}
                      dataSource={dataSource}
                      loading={loading}
                      columns={columns}
                    />
                  </div>
                )}
                <div className="text-[1.25rem] font-semibold">
                  {question?.type === "quiz" ? (
                    <div className="space-y-4">
                      {Array.isArray(question?.content) &&
                        question?.content?.map((q, i) => (
                          <div key={i} className="space-y-2">
                            <p>{q.title}</p>
                            <div className="pl-4 space-y-2">
                              {q.answers?.map(
                                (answer: string, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <span className="text-gray-500">
                                      {String.fromCharCode(65 + index)}.
                                    </span>
                                    <p>{answer}</p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">
                      {typeof question?.content === "string"
                        ? question.content
                        : ""}
                    </div>
                  )}
                </div>
                {user?.role == "2" && (
                  <div className="flex items-center justify-between">
                    <Badge dot>
                      <div className="flex items-center gap-2 *:text-[#878787] *:text-[0.875rem]">
                        <p>
                          {dayjs(question?.createdAt).format(
                            "hh:mm ddd MMMM YYYY"
                          )}
                        </p>
                        <span>-</span>
                        <>
                          {dayjs(question?.createdAt).format(
                            "hh:mm ddd MMMM YYYY"
                          )}
                        </>
                      </div>
                    </Badge>
                    <Popconfirm
                      title="Đặt lại hạn nộp"
                      okText="Lưu"
                      okButtonProps={{
                        onClick: form.submit,
                        htmlType: "submit",
                      }}
                      description={
                        <Form
                          className="flex flex-col gap-2 [&_.ant-form-item]:mb-0"
                          form={form}
                          onFinish={onFinish}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 16 }}
                          initialValues={{
                            date: dayjs(question?.updatedAt),
                            time: dayjs(question?.updatedAt),
                          }}
                        >
                          <Form.Item
                            label="Ngày"
                            name="date"
                            getValueProps={(value) => ({
                              value: value && dayjs(Number(value)),
                            })}
                            normalize={(value) =>
                              value && `${dayjs(value).valueOf()}`
                            }
                          >
                            <DatePicker
                              format={{
                                format: "YYYY-MM-DD",
                                type: "mask",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Giờ"
                            name="time"
                            getValueProps={(value) => ({
                              value: value && dayjs(Number(value)),
                            })}
                            normalize={(value) =>
                              value && `${dayjs(value).valueOf()}`
                            }
                          >
                            <TimePicker
                              defaultValue={dayjs(question?.updatedAt)}
                              format={format}
                            />
                          </Form.Item>
                        </Form>
                      }
                      onConfirm={confirm}
                      onOpenChange={() => console.log("open change")}
                    >
                      <Button color="danger" variant="solid">
                        Đặt lại thời gian
                      </Button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            </div>
            <main className="">{children}</main>
          </div>
          <QuestionSidebar
            meetings={detail?.meetings || []}
            questions={question.remainingQuestions || []}
          />
        </div>
      </Spin>
    </MainLayout>
  );
};

export default QuestionLayout;
