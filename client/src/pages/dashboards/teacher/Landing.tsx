import {
  ArrowsOutSimple,
  Bandaids,
  CalendarDots,
  CaretRight,
  CornersOut,
  Notebook,
  PaperPlaneRight,
  Play,
} from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import {
  Avatar,
  Button,
  Checkbox,
  List,
  Progress,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import {
  useExternalCourseStore,
  useUserStore,
} from "../../../utils/zustand/Store";
interface DataType {
  key: string;
  class: string;
  lesson: string;
  course: string;
  progress: {
    cur: number;
    total: number;
  };
}
const Landing: React.FC = () => {
  const { getKeyword, user } = useUserStore();
  const keyword = user && getKeyword ? getKeyword(user) : "";
  const { fetchCourseraCourses, coursera, loading } = useExternalCourseStore();
  const [selected, setSelected] = useState<string>("");
  useEffect(() => {
    return () => {
      fetchCourseraCourses(keyword);
    };
  }, []);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Môn học",
      dataIndex: "lesson",
      key: "lesson",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Khoá học",
      dataIndex: "course",
      key: "course",
      render: (text) => (
        <Tag color="#c2e8f6" className="text-black code">
          {text}
        </Tag>
      ),
    },
    {
      title: "Tiến trình",
      key: "progress",
      dataIndex: "progress",
      render: (progress) => (
        <div className="flex items-center gap-2">
          <div>
            <span className="font-semibold">{progress?.cur}</span>
            <span>/</span>
            <span>{progress?.total}</span>
          </div>
          <Tag color="#fde1ac" className="text-black code">
            {(progress?.cur * progress?.total) / 100}%
          </Tag>
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      class: "SE1834",
      lesson: "asdasdasdasdasdsdas",
      course: "CSI101",
      progress: {
        cur: 30,
        total: 100,
      },
    },
  ];
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-8">
          <div className="my-2 font-semibold">
            <h1 className="text-[2.5rem]">
              <span className="text-[#a4a4a4]">Chào mừng trở lại, </span>
              <span>{user?.name} !</span>
            </h1>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 p-4 bg-white border shadow-md rounded-2xl">
              <div className="flex items-center justify-between ">
                <h1 className="font-bold text-[1.625rem]">Theo dõi khóa học</h1>
                <Button shape="circle" className="border ">
                  <ArrowsOutSimple size={18} />
                </Button>
              </div>
              <ul className="flex flex-col gap-2 my-4">
                <li className="bg-[#c2e8f6] p-2 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Tag className="px-2 my-2 border-none rounded-3xl">
                        tag o day
                      </Tag>
                      <h1 className="text-[1rem]">Ten mon hoc</h1>
                    </div>
                    <div className="p-2 border rounded-full border-[#4b4b4b]">
                      <Notebook size={20} />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Progress percent={30} strokeColor={"#fde1ac"} />
                      <p>Tiến trình</p>
                    </div>
                  </div>
                </li>
                <li className="bg-[#f6f8fa] p-2 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h1>Ten mon hoc</h1>
                    <Button
                      shape="circle"
                      className=" border border-[#4b4b4b] cursor-pointer"
                    >
                      <CornersOut size={18} />
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-span-6 p-4 bg-white border shadow-md rounded-2xl">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-[1.625rem]">Theo dõi lớp học</h1>
                <Button
                  icon={<Play size={14} />}
                  className="p-2 text-[0.75rem] rounded-2xl"
                >
                  Kiểm tra
                </Button>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-baseline gap-1">
                  <h1 className="text-[60px]">30</h1>
                  <span className="text-[20px]">lop</span>
                </div>
                <div className="text-[#727272] text-[0.75rem]">
                  <p>Được giao vào</p>
                  <p>{dayjs().format("DD/MM/YYYY")} </p>
                </div>
              </div>
              <ul className="grid flex-wrap grid-cols-12 gap-2">
                <li className="min-h-[5rem] max-h-[7.5rem] bg-[#fafafc] p-2 flex-col flex justify-between shadow-md rounded-xl col-span-6 ">
                  <h1>Lop SE1834</h1>
                  <Progress
                    size={24}
                    className="[&_.ant-progress-inner]:rounded-md [&_.ant-progress-inner]:w-[7.5rem]"
                    percentPosition={{ align: "center", type: "inner" }}
                    format={() => "30/100"}
                    percent={30}
                    strokeColor={"#fde1ac"}
                  />
                </li>
                <li className="min-h-[5rem] max-h-[7.5rem] bg-[#fafafc] p-2 flex-col flex justify-between shadow-md rounded-xl col-span-6 ">
                  <h1>Lop SE1834</h1>
                  <Progress
                    strokeWidth={24}
                    className="[&_.ant-progress-inner]:rounded-md [&_.ant-progress-inner]:w-[7.5rem]"
                    percentPosition={{ align: "center", type: "inner" }}
                    format={() => "30/100"}
                    percent={30}
                    strokeColor={"#fde1ac"}
                  />
                </li>
                <li className="min-h-[5rem] max-h-[7.5rem] bg-[#fafafc] p-2 flex-col flex justify-between shadow-md rounded-xl col-span-6 ">
                  <h1>Lop SE1834</h1>
                  <Progress
                    strokeWidth={24}
                    className="[&_.ant-progress-inner]:rounded-md [&_.ant-progress-inner]:w-[7.5rem]"
                    percentPosition={{ align: "center", type: "inner" }}
                    format={() => "30/100"}
                    percent={30}
                    strokeColor={"#fde1ac"}
                  />
                </li>
                <li className="min-h-[5rem] max-h-[7.5rem] bg-[#fafafc] p-2 flex justify-center items-center border-2 border-dashed border-[#a3a3a3] rounded-xl col-span-6 ">
                  <Button icon={<Bandaids size={18} />}>Xem thêm</Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4 my-2 bg-white border shadow-md rounded-2xl">
            <div className="flex items-center justify-between">
              <h1 className="text-[1.875rem] font-semibold">
                Danh sách bài học
              </h1>
              <Button shape="circle" icon={<Plus />}></Button>
            </div>
            <Table<DataType> columns={columns} dataSource={data} />
          </div>
        </div>
        <div className="flex flex-col col-span-4 gap-2 my-2">
          <div className="p-4 bg-white shadow-md rounded-2xl">
            <div className="flex items-center justify-between">
              <h1 className="text-[1.625rem] font-bold">Hoạt động </h1>
              <div className="border border-[#c9c9c9] p-1 rounded-full">
                <CalendarDots size={18} />
              </div>
            </div>
            <div className="my-2">
              <h1 className="text-[1.25rem] font-semibold m-0">
                {dayjs().format("dddd MM/YYYY")}
              </h1>
              <p className="text-[0.75rem] text-[#878787]">
                Hoạt động trong tuần này
              </p>
            </div>
            <ul className="flex flex-wrap max-w-full gap-2 my-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <li>
                  <Button
                    key={index}
                    type={index % 2 == 0 ? "primary" : "default"}
                    className={`${
                      index % 2 == 0 && "bg-[#c2e8f6] text-[#000]"
                    } px-3 py-4`}
                  >
                    {day}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-white shadow-md rounded-2xl">
            <h1 className="text-[1.625rem] font-bold">Công việc hàng ngày</h1>
            <ul className="flex flex-col gap-2 my-2">
              <li className="flex items-center justify-between">
                <Checkbox className="[&_.ant-checkbox-inner]:p-4 [&_.ant-checkbox-inner::after]:inset-0 [&_.ant-checkbox-inner::after]:m-auto  [&_.ant-checkbox-inner::after]:mb-2">
                  <div>
                    <p className="text-[0.375rem] text-[#878787]">
                      Chưa hoàn thành
                    </p>
                    <h1 className="text-[18px] font-semibold">Nigger</h1>
                  </div>
                </Checkbox>
                <div className="flex items-baseline gap-1 bg-[#f6f5fa] p-1 rounded-md">
                  <p className="text-[1rem]">12</p>
                  <span className="text-[0.5rem]">phút</span>
                </div>
              </li>
            </ul>
            <Button className="font-semibold text-white bg-black" block>
              Tới thời khóa biểu
            </Button>
          </div>
          <div className="p-4 bg-white shadow-md rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.5rem] text-[#878787]">Nền tảng khác</p>
                <h1 className="text-[1.125rem] font-semibold">
                  Các môn học tự chọn
                </h1>
              </div>
              <Button icon={<CaretRight size={16} />} shape="circle" />
            </div>
            <List
              loading={loading}
              pagination={{
                position: "bottom",
                align: "center",
                pageSize: 2,
                size: "small",
                simple: true,
              }}
              dataSource={coursera}
              renderItem={(item, index) => (
                <List.Item className="grid grid-cols-12 gap-2" key={index}>
                  <div className="col-span-4 ">
                    <img
                      src={item?.photoUrl}
                      className="rounded-md"
                      alt={item?.name}
                    />
                  </div>
                  <div className="flex flex-col col-span-8 gap-1">
                    <div className="flex flex-wrap gap-2 overflow-hidden">
                      <Tooltip title={item?.domainTypes[0]?.domainId}>
                        <Tag
                          key={index}
                          className="code text-[0.375rem] truncate text-black"
                        >
                          {item?.domainTypes[0]?.domainId}
                        </Tag>
                      </Tooltip>
                    </div>
                    <Tooltip
                      title={() => (
                        <p className="truncate">{item?.description}</p>
                      )}
                    >
                      <h1 className="font-semibold truncate text-wrap">
                        {item?.name}
                      </h1>
                    </Tooltip>
                    <Button block size="small">
                      <a
                        href={item?.previewLink}
                        className="flex items-center gap-2"
                        target="_blank"
                      >
                        <PaperPlaneRight size={16} />
                        <p> Xem chi tiết</p>
                      </a>
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Landing;
