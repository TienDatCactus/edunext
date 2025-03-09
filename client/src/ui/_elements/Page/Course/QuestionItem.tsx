import {
  Chalkboard,
  Check,
  ExclamationMark,
  Eye,
  SealQuestion,
} from "@phosphor-icons/react";
import { Badge, Button, Collapse, Table, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourseStore, useUserStore } from "../../../../utils/zustand/Store";
import { Question } from "./../../../../utils/interfaces";
import pagination from "antd/es/pagination";
import { getCountStatistics } from "../../../../utils/api";

const QuestionItem: React.FC<{
  question?: Question;
  deadline?: string;
  index?: number;
}> = ({ question, index, deadline }) => {
  const { detail } = useCourseStore();
  const { user } = useUserStore();
  console.log(question);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);
  const getStatistics = async () => {
    try {
      setLoading(true);
      const resp = await getCountStatistics(question?._id || "");
      if (resp) {
        setStatistics(resp);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      getStatistics();
    };
  }, []);
  const swapper = {
    quiz: "Trắc nghiệm",
    code: "Lập trình",
    response: "Tự luận",
  };
  interface DataType {
    answers: number;
    comments: number;
    toDeadline: string;
    groups?: number;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tổng số câu trả lời",
      dataIndex: "answers",
      key: "answers",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tổng số bình luận",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Thời gian còn lại",
      dataIndex: "toDeadline",
      key: "toDeadline",
    },
    {
      title: "Nhóm",
      dataIndex: "groups",
      key: "groups",
      render: (text) => (
        <Badge dot={text == 0} offset={[0, 0]}>
          <p>{text}</p>
        </Badge>
      ),
    },
  ];

  const data: DataType[] = [
    {
      answers: statistics?.totalSubmissions || 0,
      comments: statistics?.totalComments || 0,
      toDeadline: dayjs(deadline).toNow(),
      groups: statistics?.groups || 0,
    },
  ];

  switch (String(user?.role)) {
    case "1":
      return (
        <li className="flex items-center justify-between p-2 rounded-md cursor-pointer -slideInLeft group ">
          <div className="flex items-center gap-2">
            <SealQuestion size={22} />
            <h1>Câu hỏi #{index}</h1>
            <Tag color="cyan" className="quick-sand">
              {question?.type && swapper[question?.type]}
            </Tag>
          </div>
          <div className="flex items-center gap-2">
            <Tag
              icon={
                !question?.status ? (
                  <ExclamationMark size={22} className="" />
                ) : (
                  <Check size={22} className="" />
                )
              }
              color={!question?.status ? "red" : "green"}
              className="flex items-center gap-2 min-h-[30px] "
            >
              {!question?.status ? "chưa hoàn thành" : "đã hoàn thành"}
            </Tag>
            <Link
              to={`/course/${detail?.courseCode}/lesson/${question?.lesson}/question`}
              state={{
                questionId: question?._id,
              }}
            >
              <Button>Xem</Button>
            </Link>
          </div>
        </li>
      );
    case "2":
      return (
        <Collapse
          className="p-2 bg-white rounded-md cursor-pointer group"
          expandIconPosition="end"
          items={[
            {
              label: (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SealQuestion size={22} />
                    <h1>Câu hỏi #{index}</h1>
                    <Tag color="cyan" className="quick-sand">
                      {question?.type && swapper[question?.type]}
                    </Tag>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag
                      icon={<Chalkboard size={20} />}
                      color="geekblue"
                      className="flex items-center gap-2 min-h-[30px] "
                    >
                      Thuộc chương trình
                    </Tag>
                  </div>
                </div>
              ),
              children: (
                <div>
                  <Table<DataType>
                    loading={loading}
                    pagination={{ position: ["none", "none"] }}
                    columns={columns}
                    dataSource={data}
                  />
                  <div className="flex justify-end mt-2">
                    <Link
                      to={`/course/${detail?.courseCode}/lesson/question`}
                      state={{
                        questionId: question?._id,
                        lessonId: question?.lesson,
                      }}
                    >
                      <Button type="primary" icon={<Eye size={20} />}>
                        Kiểm tra
                      </Button>
                    </Link>
                  </div>
                </div>
              ),
            },
          ]}
        />
      );
    default:
      return null;
  }
};

export default QuestionItem;
