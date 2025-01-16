import {
  ChatDots,
  DotsThree,
  ThumbsDown,
  ThumbsUp,
} from "@phosphor-icons/react";
import { Button, Form, FormProps, Input, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubmissionItem } from "../../../../../../utils/interfaces";
import {
  getUserById,
  postSubmissionComment,
} from "../../../../../../utils/api";

const Answer: React.FC<SubmissionItem> = ({
  submissionId,
  submissionContent,
  submissionDate,
  userId,
  comments,
  setAllSubmissions,
  setLoading,
}) => {
  const [form] = Form.useForm();
  const { questionId } = useParams();
  const [user, setUser] = useState<string>();
  const [reply, setReply] = useState<Boolean>(false);
  const onFinish: FormProps<{ comment: string }>["onFinish"] = async (
    values
  ) => {
    try {
      setLoading(true);
      const { comment } = values;
      const newComment = await postSubmissionComment(
        comment,
        questionId,
        submissionId
      );
      if (newComment?.isOk) {
        setAllSubmissions(newComment?.allSubmission);
      }
    } catch (error) {
      message.error("Gặp lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };
  const getUser = async () => {
    try {
      setLoading(true);
      const resp = await getUserById(userId);
      if (resp?.isOk) {
        setUser(resp?.user?.name);
      }
    } catch (error) {
      message.error("Gặp lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      getUser();
    };
  }, []);
  console.log(user);
  return (
    <li>
      <div className="grid items-start grid-cols-12 gap-2">
        <div className="flex justify-center">
          <img
            src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${userId}`}
            alt="avatar"
            className="w-10 col-span-1 mt-2 rounded-full"
          />
        </div>
        <div className="col-span-11 duration-200">
          <div className="flex items-start gap-2">
            <p className="font-bold text-[20px]">{user}</p>
            <p className="text-[12px] text-[#6a6a6a]">
              {dayjs(submissionDate).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
          <div className="mb-2">
            <p className="text-[16px] leading-6">{submissionContent}</p>
          </div>
          <div className="flex gap-4 *:flex *:place-items-center *:gap-1 *:text-[16px] ">
            <div className="cursor-pointer group">
              <ThumbsUp className="group-hover:animate-bounceIn" size={20} />
              <p>25</p>
            </div>
            <div className="cursor-pointer group">
              <ThumbsDown className="group-hover:animate-bounceIn" size={20} />
              <p>20</p>
            </div>
            <div
              className="cursor-pointer group"
              onClick={() => setReply(!reply)}
            >
              <ChatDots size={20} className="group-hover:animate-bounceIn" />
              <p>Phản hồi</p>
            </div>
            <div>
              <DotsThree size={20} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      {(comments ?? []).length > 0 && (
        <ul className="flex flex-col gap-4 mt-4 ml-14">
          {!!comments?.length &&
            comments?.map((comment, index) => {
              if (comment?.submissionId === submissionId) {
                return (
                  <li
                    key={index}
                    className="grid items-start grid-cols-12 gap-2"
                  >
                    <div className="flex justify-center">
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${comment?.user?.userId}`}
                        alt="avatar"
                        className="w-10 col-span-1 mt-2 rounded-full"
                      />
                    </div>
                    <div className="col-span-11 duration-200">
                      <div className="flex items-start gap-2">
                        <p className="font-bold text-[20px]">
                          {comment?.user?.name}
                        </p>
                        <p className="text-[12px] text-[#6a6a6a]">
                          {dayjs(comment?.commentDate).format(
                            "YYYY-MM-DD HH:mm"
                          )}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className="text-[16px] leading-6">
                          {comment?.commentContent}
                        </p>
                      </div>
                      <div className="flex gap-4 *:flex *:place-items-center *:gap-1 *:text-[16px] ">
                        <div className="cursor-pointer group">
                          <ThumbsUp
                            className="group-hover:animate-bounceIn"
                            size={20}
                          />
                          <p>25</p>
                        </div>
                        <div className="cursor-pointer group">
                          <ThumbsDown
                            className="group-hover:animate-bounceIn"
                            size={20}
                          />
                          <p>20</p>
                        </div>
                        <div>
                          <DotsThree size={20} className="cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
              return null;
            })}
        </ul>
      )}
      {reply && (
        <div className="mt-2 duration-500 ml-14 animate-bounceInDown">
          <Form onFinish={onFinish} className="flex w-full gap-2" form={form}>
            <Form.Item
              className="w-full"
              name="comment"
              rules={[{ required: true, message: "Nhập nội dung" }]}
            >
              <Input
                name="comment"
                placeholder="Nhập nội dung"
                className="code"
              />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </li>
  );
};

export default Answer;
