import { Badge, Breadcrumb, Button, Empty, Modal } from "antd";
import React, { useState } from "react";

const Group: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div>
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
      <ul className="w-full min-h-[300px] mx-auto my-2 flex flex-col gap-4">
        {/* <li className="flex justify-between px-4 py-2 border rounded-md shadow-md">
          <div className="flex flex-col gap-2">
            <div>
              <div className="flex items-center gap-2">
                <img
                  loading="lazy"
                  src="https://ui-avatars.com/api/?background=random"
                  alt="ava"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="font-semibold text-[16px]">Nguyen Tien Dat</h1>
                  <span className="text-[12px]">#HE180012</span>
                </div>
              </div>
              <p></p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 *:border-none">
                <Tag>Frontend</Tag>
                <Tag>HE</Tag>
                <Tag>Nigger</Tag>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#5f6c76]">
                <p>Joined: 20/10/2021</p>
                <Badge color="#5f6c76" />
                <p>Role: Student</p>
              </div>
            </div>
          </div>
          <Button icon={<DotsThreeVertical size={22} />} />
        </li> */}
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
                  title="Title"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>{modalText}</p>
                </Modal>
              </Badge>
            </div>
          }
        />
      </ul>
    </div>
  );
};

export default Group;
