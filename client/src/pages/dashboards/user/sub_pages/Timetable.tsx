import {
  Bell,
  PencilLine,
  ShareNetwork,
  Trash,
  UploadSimple,
  UserCirclePlus,
} from "@phosphor-icons/react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  message,
  Modal,
  Select,
} from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useState } from "react";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import { useUserStore } from "../../../../utils/zustand/Store";
import TimetableCalendar from "./sub_elements/TimetableCalendar";
import { currentYear } from "../../../course/home/HomePage";
import { error, log } from "console";
import { format } from "path";
import { postTimetableInfo } from "../../../../utils/api";
const Timetable: React.FC = () => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish: FormProps<any>["onFinish"] = async (props) => {
    const { type, content } = props;
    const currentYear = dayjs().year();
    const timeline =
      selectedMonth && selectedDay
        ? dayjs(
            `${currentYear}-${selectedMonth}-${selectedDay}`,
            "YYYY-M-D",
            true
          )
        : null;
    if (timeline?.isValid()) {
      const resp = await postTimetableInfo(
        user?._id || "",
        String(timeline),
        content,
        type
      );
      if (resp) {
        setIsModalOpen(false);
        form.resetFields();
        message.success("Thêm công việc vào thời khóa biểu thành công");
      }
    } else {
      console.error("Invalid date selected");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { user } = useUserStore();
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-bold">Thời khóa biểu</h1>
        </div>
        <div className="flex gap-2">
          <Button icon={<ShareNetwork size={22} />} className="border-none" />
          <Button icon={<Bell size={22} />} className="border-none" />
        </div>
      </div>
      <Divider className="my-2 border-[#ddd]" />
      <div className="flex items-center justify-between my-2">
        <div className="flex gap-2">
          <Button iconPosition="start" icon={<UploadSimple size={14} />}>
            Xuất File
          </Button>
          <Button iconPosition="start" icon={<Trash size={14} />}>
            Thời gian biểu đã xóa
          </Button>
        </div>
        <Button
          iconPosition="start"
          icon={<UserCirclePlus size={14} />}
          variant="outlined"
          color="primary"
        >
          Mời
        </Button>
      </div>
      <Divider className="my-2 border-[#ddd]" />
      <div className="flex items-center justify-between my-4">
        <div>
          <div className="flex items-start gap-1">
            <h1 className="text-[34px] font-semibold">
              {dayjs().format("MMMM/YYYY")}
            </h1>
            <Button icon={<PencilLine size={22} />} className="border-none" />
          </div>
          <p className="text-[14px] text-[#3d3d3d]">
            {dayjs().format("MMMM dd/YYYY")} - {dayjs().format("MMMM dd/YYYY")}
          </p>
        </div>
        <Button type="primary" onClick={showModal}>
          Thêm thời gian biểu
        </Button>
        <Modal
          title="Thêm công việc vào thời khóa biểu"
          height={400}
          className="[&_.ant-modal-title]:text-[20px]"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button
              form="timetable-form"
              htmlType="submit"
              key="submit"
              type="primary"
            >
              Lưu
            </Button>,
          ]}
        >
          <Form
            id="timetable-form"
            layout="vertical"
            className="min-h-[200px] "
            preserve={false}
            onFinish={onFinish}
            form={form}
          >
            <div className="flex gap-2">
              <Form.Item
                layout="vertical"
                label="Ngày"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  format="D"
                  onChange={(date) => setSelectedDay(date ? date.date() : null)}
                />
              </Form.Item>
              <Form.Item
                layout="vertical"
                label="Tháng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn tháng",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  picker="month"
                  format="MMMM"
                  onChange={(date) =>
                    setSelectedMonth(date ? date.month() + 1 : null)
                  } // Convert 0-based month index to 1-based
                />
              </Form.Item>
              <Form.Item
                layout="vertical"
                label="Loại công việc"
                className="col-span-6"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại công việc",
                  },
                ]}
              >
                <Select
                  className="w-full"
                  showSearch
                  placeholder="Chọn loại công việc"
                  optionFilterProp="label"
                  options={[
                    {
                      value: "warning",
                      label: "Cần làm",
                    },
                    {
                      value: "note",
                      label: "Ghi nhớ",
                    },
                    {
                      value: "important",
                      label: "Quan trọng",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <Form.Item
              layout="vertical"
              label="Mô tả công việc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả công việc",
                },
              ]}
              name="content"
            >
              <TextArea className="w-full min-h-[100px]" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <TimetableCalendar />
    </DashboardLayout>
  );
};

export default Timetable;
