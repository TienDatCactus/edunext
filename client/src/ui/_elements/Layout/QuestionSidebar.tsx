import {
  BookBookmark,
  Question as QuestionIcon,
  Trophy,
  Users,
  Clock,
  ChartBar,
} from "@phosphor-icons/react";
import { Kanban } from "@phosphor-icons/react/dist/ssr";
import {
  Badge,
  Button,
  Divider,
  Select,
  Progress,
  Tooltip,
  Space,
  Tag,
} from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Question } from "../../../utils/interfaces";

interface QuestionStats {
  totalQuestions: number;
  completedQuestions: number;
  averageScore: number;
  timeSpent: number;
  participationRate: number;
}

interface QuestionSidebarProps {
  meetings: {
    type?: string;
    link?: string;
    _id?: string;
  }[];
  questions: Question[];
}

const QuestionSidebar: React.FC<QuestionSidebarProps> = ({
  meetings,
  questions,
}) => {
  const { courseCode, lessonId } = useParams();
  const [meetingValue, setMeetingValue] = useState<string>("none");
  const [stats, setStats] = useState<QuestionStats>({
    totalQuestions: questions.length,
    completedQuestions: questions.filter((q) => q.status).length,
    averageScore: 85,
    timeSpent: 120,
    participationRate: 75,
  });

  useEffect(() => {
    setStats({
      totalQuestions: questions.length,
      completedQuestions: questions.filter((q) => q.status).length,
      averageScore: 85,
      timeSpent: 120,
      participationRate: 75,
    });
  }, [questions]);

  const progressData = [
    {
      type: "Quiz",
      value: questions.filter((q) => q.type === "quiz").length || 0,
      color: "#52c41a",
    },
    {
      type: "Code",
      value: questions.filter((q) => q.type === "code").length || 0,
      color: "#faad14",
    },
    {
      type: "Response",
      value: questions.filter((q) => q.type === "response").length || 0,
      color: "#f5222d",
    },
  ];

  const handleJoinMeeting = () => {
    if (meetingValue !== "none") {
      window.open(meetingValue, "_blank");
    }
  };

  const getQuestionTypeColor = (type?: string) => {
    switch (type) {
      case "quiz":
        return "success";
      case "code":
        return "warning";
      case "response":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="col-span-4 border rounded-md shadow-lg max-h-[800px] overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Kanban size={22} />
          <h1 className="text-[16px] font-semibold m-0">Learning Progress</h1>
        </div>
        <QuestionIcon size={20} />
      </div>

      <Divider className="m-0" />

      {/* Meeting Section */}
      <div className="p-4 bg-white border-b">
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">
            Meeting Resources
          </label>
          <Select
            value={meetingValue}
            className="w-full mt-1"
            onChange={setMeetingValue}
            options={[
              { value: "none", label: "Select meeting method" },
              ...meetings.map((meet) => ({
                value: meet?.link,
                label: meet.type,
              })),
            ]}
          />
        </div>
        <Button
          type={meetingValue === "none" ? "dashed" : "primary"}
          className="w-full"
          disabled={meetingValue === "none"}
          onClick={handleJoinMeeting}
        >
          {meetingValue === "none" ? "Select a meeting method" : "Join Meeting"}
        </Button>
      </div>

      {/* Progress Stats */}
      <div className="p-4 bg-white border-b">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ChartBar size={20} />
          Progress Overview
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <Progress
              type="circle"
              percent={Math.round(
                (stats.completedQuestions / stats.totalQuestions) * 100
              )}
              size={80}
            />
            <p className="mt-2 text-sm">Completion Rate</p>
          </div>
          <div className="text-center">
            <Progress
              type="circle"
              percent={stats.participationRate}
              size={80}
              strokeColor="#52c41a"
            />
            <p className="mt-2 text-sm">Participation</p>
          </div>
        </div>

        <div className="space-y-3">
          {progressData.map((item) => (
            <div key={item.type}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.type}</span>
                <span>{item.value} questions</span>
              </div>
              <Progress
                percent={Math.round((item.value / stats.totalQuestions) * 100)}
                strokeColor={item.color}
                showInfo={false}
                size="small"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Question List */}
      <div className="p-4 bg-white">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookBookmark size={20} />
          Questions ({questions.length})
        </h2>
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div
              key={question._id}
              className="border rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Question #{index + 1}</h3>
                <Tag color={getQuestionTypeColor(question.type)}>
                  {question.type || "response"}
                </Tag>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mt-2">
                <Tooltip title="Status">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    {question.status ? "Completed" : "Pending"}
                  </div>
                </Tooltip>
                <Tooltip title="Created At">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {new Date(question.createdAt || "").toLocaleDateString()}
                  </div>
                </Tooltip>
                <Tooltip title="Type">
                  <div className="flex items-center gap-1">
                    <Trophy size={16} />
                    {question.type}
                  </div>
                </Tooltip>
              </div>

              <div className="mt-3">
                <Link
                  to={`/course/${courseCode}/lesson/question`}
                  state={{
                    questionId: question?._id,
                  }}
                >
                  <Button type="link" className="w-full">
                    {question.status ? "Review Answer" : "Start Question"}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionSidebar;
