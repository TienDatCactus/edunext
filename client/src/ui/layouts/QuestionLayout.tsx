import { Breadcrumb, Divider, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionDetail } from "../../utils/api";
import { getCurrentSeason } from "../../utils/customHooks";
import { useCourseStore } from "../../utils/zustand/Store";
import QuestionSidebar from "../_elements/Layout/QuestionSidebar";
import MainLayout from "./MainLayout";
import { Question } from "../../utils/interfaces";

const QuestionLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();
  const { detail } = useCourseStore();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Question>();
  const location = useLocation();
  const questionId = location.state?.questionId;
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
  const getQuestion = async () => {
    if (!questionId) return;
    try {
      setLoading(true);
      const resp = await getQuestionDetail(questionId);
      if (resp?.isOk) {
        setQuestion(resp?.question);
      }
    } catch (error) {
      message.error("Gặp lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      getQuestion();
    };
  }, []);
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
                <p className="font-light">
                  {typeof question?.content === "string"
                    ? question.content
                    : ""}
                </p>
              </div>
            </div>
            <main className=" -fadeInLeft">{children}</main>
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
