import {
  Blueprint,
  CircleDashed,
  CircleHalf,
  Circuitry,
  ClockUser,
  Pencil,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import type { TabsProps } from "antd";
import { Button, Collapse, Divider, Progress, Table, Tabs, Tag } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import { Question, QuestionQuizContent } from "../../../../utils/interfaces";
function LessonDetail() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>();
  const swapper = {
    quiz: "Trắc nghiệm",
    code: "Lập trình",
    response: "Tự luận",
  };
  const fetchQuestion = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/question/getQuestions"
      );
      if (res) {
        setQuestions(res.data.data);
      }
    } catch (error) {}
  };
  const tabItemCheck = (q: Question) => {
    switch (q?.type) {
      case "quiz":
        return (
          <Collapse
            collapsible="header"
            className="bg-white hover:bg-[#f7fbfe] hover:border-[#7fc8ff] shadow-md"
            defaultActiveKey={["1"]}
            items={[
              {
                key: q?._id,
                label: (
                  <div className="flex flex-col gap-2 px-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[1rem] text-[#878787] font-semibold ">
                          #{q?._id && q?._id.substring(0, 6)}
                        </span>
                        <span>-</span>
                        <span className="text-[1.25rem] font-bold"></span>
                        {q?.status == false ? (
                          <Tag
                            className="flex items-center gap-1 rounded-lg dm-sans"
                            color="warning"
                            icon={<CircleDashed size={16} />}
                          >
                            Chưa có câu trả lời
                          </Tag>
                        ) : (
                          <Tag
                            className="flex items-center gap-1 rounded-lg dm-sans"
                            color="processing"
                            icon={<CircleHalf size={16} />}
                          >
                            Đã có câu trả lời
                          </Tag>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="primary"
                          icon={<Pencil />}
                          onClick={() =>
                            navigate("/dashboard/lessons/questions/modify", {
                              state: {
                                lesson: q,
                              },
                            })
                          }
                        >
                          Chỉnh sửa
                        </Button>
                        <Button type="primary" danger icon={<Trash />}>
                          Xóa
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center *:text-[#898989] text-[0.75rem]">
                      <span className="flex items-center gap-1">
                        <Circuitry size={18} />
                        Câu hỏi thành phần
                      </span>
                      <span className="px-[30px] flex items-center">
                        <ClockUser size={18} className="mr-[5px]" />
                        {dayjs(q?.createdAt).format("hh:mm DD/MM/YYYY")}
                      </span>
                      <span className="flex items-center">
                        <Blueprint size={18} className="mr-[5px]" />
                        {q?.type && swapper[q?.type]}
                      </span>
                    </div>
                    <Divider className="my-0 border-[#ccc]" />
                    <div className="flex items-center gap-2">
                      <Progress type="dashboard" percent={50} size={16} />
                      <span className="font-semibold text-[0.875rem]">
                        Số lượng câu trả lời (20/30)
                      </span>
                      <span className="text-[0.625rem] text-[#878787] font-semibold">
                        Cập nhật {dayjs().toNow(true)} trước
                      </span>
                    </div>
                  </div>
                ),
                children: (
                  <Table
                    bordered
                    dataSource={(q?.content as QuestionQuizContent[])?.map(
                      (item, index) => ({
                        title: item?.title,
                        correctAnswer:
                          item?.answer &&
                          item?.correctAnswer !== undefined &&
                          item?.answer[item?.correctAnswer],
                      })
                    )}
                    columns={[
                      {
                        title: "Câu hỏi",
                        dataIndex: "title",
                        key: "title",
                        render: (text) => (
                          <h1 className="text-[0.875rem] font-semibold">
                            {text}
                          </h1>
                        ),
                      },
                      {
                        title: "Đáp án",
                        dataIndex: "correctAnswer",
                        key: "correctAnswer",
                        render: (text) => (
                          <Tag color="success" className="dm-sans">
                            {text}
                          </Tag>
                        ),
                      },
                    ]}
                  />
                ),
                showArrow: false,
              },
            ]}
          />
        );
      case "code":
        return (
          <div className="flex flex-col gap-2 bg-white hover:bg-[#f7fbfe] hover:border-[#7fc8ff] shadow-md cursor-pointer p-4 px-6 rounded-md border">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[1rem] text-[#878787] font-semibold ">
                      #{q?._id && q?._id.substring(0, 6)}
                    </span>
                    <span>-</span>
                    <span className="text-[1.25rem] font-bold"></span>
                    {q?.status ? (
                      <Tag
                        className="flex items-center gap-1 rounded-lg dm-sans"
                        color="warning"
                        icon={<CircleDashed size={16} />}
                      >
                        Chưa có câu trả lời
                      </Tag>
                    ) : (
                      <Tag
                        className="flex items-center gap-1 rounded-lg dm-sans"
                        color="processing"
                        icon={<CircleHalf size={16} />}
                      >
                        Đã có câu trả lời
                      </Tag>
                    )}
                  </div>
                </div>
                <div className="flex items-center *:text-[#898989] text-[0.75rem]">
                  <span className="flex items-center gap-1">
                    <Circuitry size={18} />
                    Câu hỏi thành phần
                  </span>
                  <span className="px-[30px] flex items-center">
                    <ClockUser size={18} className="mr-[5px]" />
                    {dayjs(q?.createdAt).format("hh:mm DD/MM/YYYY")}
                  </span>
                  <span className="flex items-center">
                    <Blueprint size={18} className="mr-[5px]" />
                    {q?.type && swapper[q?.type]}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="primary"
                  icon={<Pencil />}
                  onClick={() =>
                    navigate("/dashboard/lessons/questions/modify", {
                      state: {
                        lesson: q,
                      },
                    })
                  }
                >
                  Chỉnh sửa
                </Button>
                <Button type="primary" danger icon={<Trash />}>
                  Xóa
                </Button>
              </div>
            </div>
            <Divider className="my-0 border-[#ccc]" />
            <div className="flex items-center gap-2">
              <Progress type="dashboard" percent={50} size={16} />
              <span className="font-semibold text-[0.875rem]">
                Số lượng câu trả lời (20/30)
              </span>
              <span className="text-[0.625rem] text-[#878787] font-semibold">
                Cập nhật {dayjs().toNow(true)} trước
              </span>
            </div>
          </div>
        );
      case "response":
        return (
          <div className="flex flex-col gap-2 bg-white hover:bg-[#f7fbfe] hover:border-[#7fc8ff] shadow-md cursor-pointer p-4 px-6 rounded-md border">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[1rem] text-[#878787] font-semibold ">
                      #{q?._id && q?._id.substring(0, 6)}
                    </span>
                    <span>-</span>
                    <span className="text-[1.25rem] font-bold"></span>
                    {q?.status ? (
                      <Tag
                        className="flex items-center gap-1 rounded-lg dm-sans"
                        color="warning"
                        icon={<CircleDashed size={16} />}
                      >
                        Chưa có câu trả lời
                      </Tag>
                    ) : (
                      <Tag
                        className="flex items-center gap-1 rounded-lg dm-sans"
                        color="processing"
                        icon={<CircleHalf size={16} />}
                      >
                        Đã có câu trả lời
                      </Tag>
                    )}
                  </div>
                </div>
                <div className="flex items-center *:text-[#898989] text-[0.75rem]">
                  <span className="flex items-center gap-1">
                    <Circuitry size={18} />
                    Câu hỏi thành phần
                  </span>
                  <span className="px-[30px] flex items-center">
                    <ClockUser size={18} className="mr-[5px]" />
                    {dayjs(q?.createdAt).format("hh:mm DD/MM/YYYY")}
                  </span>
                  <span className="flex items-center">
                    <Blueprint size={18} className="mr-[5px]" />
                    {q?.type && swapper[q?.type]}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="primary"
                  icon={<Pencil />}
                  onClick={() =>
                    navigate("/dashboard/lessons/questions/modify", {
                      state: {
                        lesson: q,
                      },
                    })
                  }
                >
                  Chỉnh sửa
                </Button>
                <Button type="primary" danger icon={<Trash />}>
                  Xóa
                </Button>
              </div>
            </div>
            <Divider className="my-0 border-[#ccc]" />
            <div className="flex items-center gap-2">
              <Progress type="dashboard" percent={50} size={16} />
              <span className="font-semibold text-[0.875rem]">
                Số lượng câu trả lời (20/30)
              </span>
              <span className="text-[0.625rem] text-[#878787] font-semibold">
                Cập nhật {dayjs().toNow(true)} trước
              </span>
            </div>
          </div>
        );
    }
  };
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả",
      children: (
        <div className="flex flex-col gap-4">
          {!!questions?.length &&
            questions?.map((question: Question, index: number) =>
              tabItemCheck(question)
            )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Đã trả lời",
    },
    {
      key: "3",
      label: "Chưa trả lời",
    },
  ];

  useEffect(() => {
    fetchQuestion();
  }, []);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between my-2">
        <h1 className="text-[2.125rem] font-bold">Danh sách câu hỏi</h1>
        <Button type="primary" icon={<Plus />}>
          Thêm câu hỏi
        </Button>
      </div>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        className="[&_.ant-tabs-nav]:m-0 [&_.ant-tabs-content-holder]:bg-white [&_.ant-tabs-content-holder]:shadow-md [&_.ant-tabs-content-holder]:rounded-md [&_.ant-tabs-content-holder]:p-2"
      />
    </DashboardLayout>
  );
}

export default LessonDetail;
