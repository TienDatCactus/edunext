import {
  Badge,
  Breadcrumb,
  Button,
  DatePicker,
  Divider,
  Form,
  Popconfirm,
  Spin,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentSeason } from "../../utils/customHooks";
import { useCourseStore, useQuestionStore } from "../../utils/zustand/Store";
import QuestionSidebar from "../_elements/Layout/QuestionSidebar";
import MainLayout from "./MainLayout";
import { time } from "console";

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

  const [remainQuestions, setRemainQuestions] = useState<
    {
      questionId?: number;
      status?: boolean;
    }[]
  >();
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
    return () => {
      fetchQuestionById(questionId);
    };
  }, []);
  const onFinish = (values: any) => {
    console.log(values.date.$d.toISOString());
    console.log(values.time);
  };
  return (
    <MainLayout>
      <Spin spinning={loading}>
        <div className="grid justify-around grid-cols-12 gap-4 px-8 min-h-[800px] ">
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
                <Divider className="border-[#868686]  my-3" />
                <p className="text-[1.25rem] font-semibold">
                  {typeof question?.content === "string"
                    ? question.content
                    : ""}
                </p>
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
                    okButtonProps={{ onClick: form.submit, htmlType: "submit" }}
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
              </div>
            </div>
            <main className="">{children}</main>
          </div>
          <QuestionSidebar
            meetings={detail?.meetings || []}
            remainQuestions={remainQuestions || []}
          />
        </div>
      </Spin>
    </MainLayout>
  );
};

export default QuestionLayout;
