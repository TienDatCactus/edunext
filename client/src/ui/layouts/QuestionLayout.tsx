import React, { useEffect, useState } from "react";
import QuestionSidebar from "../_elements/Layout/QuestionSidebar";
import { Breadcrumb, Divider, message, Spin } from "antd";
import MainLayout from "./MainLayout";
import { useParams } from "react-router-dom";
import { getCourseMeeting, getQuestionDetail } from "../../utils/api";
import { getCurrentSeason } from "../../utils/customHooks";

const QuestionLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { questionId, courseCode } = useParams<{
    questionId?: string;
    courseCode?: string;
  }>();
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<{
    content?: string;
    questionId?: number;
  }>();
  const [meeting, setMeeting] = useState<
    {
      courseId?: number;
      meetingType?: string;
      meetingLink?: string;
    }[]
  >();
  const [remainQuestions, setRemainQuestions] = useState<
    {
      questionId?: number;
      status?: boolean;
    }[]
  >();
  const getMeeting = async () => {
    if (!courseCode) return;
    try {
      setLoading(true);
      const resp = await getCourseMeeting(courseCode || "");
      if (resp?.isOk) {
        setMeeting(resp?.meetings);
        setRemainQuestions(resp?.remainQuestions);
      }
    } catch (error) {
      message.error("Gặp lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
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
      getMeeting();
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
                  Câu hỏi #{questionId}
                </h1>
                <Divider className="border-[#868686]  my-3" />
                <p className="font-light">{question?.content}</p>
              </div>
            </div>
            <main className=" -fadeInLeft">{children}</main>
          </div>
          <QuestionSidebar
            meetings={meeting || []}
            remainQuestions={remainQuestions || []}
          />
        </div>
      </Spin>
    </MainLayout>
  );
};

export default QuestionLayout;
