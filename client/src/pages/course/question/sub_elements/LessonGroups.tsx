import {
  Badge,
  Breadcrumb,
  Button,
  Drawer,
  Empty,
  Form,
  InputNumber,
  message,
  Modal,
  Spin,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useQuestionStore } from "../../../../utils/zustand/Store";
import { arrangeGroup, getCourseGroup } from "../../../../utils/api";
import { useLocation } from "react-router-dom";
import { DotsThreeVertical } from "phosphor-react";
import { User } from "../../../../utils/interfaces";
import { title } from "process";
import { s } from "framer-motion/dist/types.d-6pKw1mTI";
import dayjs from "dayjs";
const { Text, Link } = Typography;
const Group: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [groups, setGroups] = useState<
    [
      {
        _id?: string;
        userId?: User[];
        course?: string;
        team?: string;
        id?: string;
      }
    ]
  >();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState<string | number | null>("0");
  const [students, setStudents] = useState<User[] | undefined>();
  const showModal = () => {
    setOpenModal(true);
  };
  const showDrawer = (team?: string) => {
    try {
      const resp = groups?.find((g) => g.team === team);
      if (resp) {
        console.log(resp);
        setStudents(resp.userId);
        setOpenDrawer(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    setOpenDrawer(false);
  };
  const { state } = useLocation();
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const resp = await arrangeGroup(state?.lessonId, number);
      if (resp) {
        message.success("Chia nhóm hoàn thành !");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };
  const getGroups = async () => {
    try {
      setLoading(true);
      const resp = await getCourseGroup(state?.lessonId);
      if (resp) {
        setGroups(resp?.groups);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      getGroups();
    };
  }, []);
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModal(false);
  };

  return (
    <div className="min-h-[300px]">
      <Breadcrumb
        className="px-4 py-2 bg-white border rounded-md shadow-md"
        items={[
          {
            key: "1",
            title: "Group 6",
            href: "/course",
          },
          {
            key: "2",
            title: "6 Students",
          },
        ]}
      />
      <Spin spinning={loading}>
        <ul className="grid flex-wrap grid-cols-12 gap-4 mx-auto my-2">
          {!!groups?.length &&
            groups?.map((g, i) => (
              <li
                key={i}
                className="flex items-center justify-between col-span-3 px-4 py-2 border rounded-md shadow-md"
              >
                <div className="flex items-center gap-2 *:text-[18px] *:font-semibold">
                  <p>Nhóm</p>
                  <span>{g?.team}</span>
                </div>
                <Button
                  icon={<DotsThreeVertical size={22} />}
                  onClick={() => showDrawer(g?.team)}
                />
              </li>
            ))}
          {!groups && (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
              className="pt-20"
              description={
                <div>
                  <p className="py-2 text-[16px]">Môn học chưa có nhóm nào</p>
                  <Badge dot>
                    <Button onClick={showModal} type="dashed">
                      Ấn để tạo nhóm
                    </Button>
                    <Modal
                      title="Tạo nhóm"
                      open={openModal}
                      onOk={handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                    >
                      <h1 className="my-2 font-semibold text-center">
                        HE180012
                      </h1>
                      <div className="flex items-center justify-center">
                        <Text keyboard>Tạo ngẫu nhiên</Text>
                      </div>
                      <div className="border-2 rounded-lg min-h-[100px] border-[#ccc] border-dashed my-2">
                        <div className="flex items-center justify-center gap-1 py-3 border-b-2 border-dashed">
                          <p>Sĩ số lớp : </p>
                          <span className="font-semibold text-amber-500">
                            30
                          </span>
                          <p>sinh viên</p>
                        </div>
                        <Form className="flex flex-col items-center justify-center py-4">
                          <h1 className="mb-2">
                            Bạn muốn chia bao nhiêu nhóm?
                          </h1>
                          <Form.Item
                            className="flex flex-col items-center justify-center"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            help={
                              <p className="text-[12px]">
                                *Giá trị với sai số lớn có thể khiến việc xếp
                                lớp khó khăn hơn.
                              </p>
                            }
                          >
                            <div className="flex justify-center">
                              <InputNumber
                                max={10}
                                className="min-w-[140px] mb-2 "
                                status={30 % Number(number) != 0 ? "error" : ""}
                                value={number}
                                onChange={setNumber}
                              />
                            </div>
                          </Form.Item>
                        </Form>
                      </div>
                    </Modal>
                  </Badge>
                </div>
              }
            />
          )}
        </ul>
        <Drawer title="Danh sách nhóm" onClose={onClose} open={openDrawer}>
          <ul>
            {!!students?.length &&
              students?.map((s, i) => {
                return (
                  <li
                    key={i}
                    className="flex justify-between px-4 py-2 border rounded-md shadow-md"
                  >
                    <div className="flex flex-col gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <img
                            loading="lazy"
                            src={`https://ui-avatars.com/api/?background=random&name=${s?.name}`}
                            alt="ava"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h1 className="font-semibold text-[16px]">
                              {s?.name}
                            </h1>
                            <span className="text-[12px]">{s?.FEID}</span>
                          </div>
                        </div>
                        <p></p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1 *:border-none *:quick-sand">
                          <Tag>{s?.role == "1" ? "Học sinh" : "Giáo viên"}</Tag>
                          <Tag>{s?.email}</Tag>
                        </div>
                        <div className="flex items-center gap-4 text-[12px] text-[#5f6c76]">
                          <p>
                            Tham gia vào : <span>{dayjs().toNow()}</span>
                          </p>
                          <Badge color="#5f6c76" />
                          <p>
                            Vai trò:{" "}
                            <span>
                              {s?.role == "1" ? "Học sinh" : "Giáo viên"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button icon={<DotsThreeVertical size={22} />} />
                  </li>
                );
              })}
          </ul>
        </Drawer>
      </Spin>
    </div>
  );
};

export default Group;
