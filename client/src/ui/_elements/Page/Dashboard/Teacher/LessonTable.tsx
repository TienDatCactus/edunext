import { Plus } from "@phosphor-icons/react";
import { Button, Table, TableProps, Tag } from "antd";
import React from "react";
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
export const LessonTable: React.FC = () => {
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
    <div className="p-4 my-2 bg-white border shadow-md rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-[1.875rem] font-semibold">Danh sách bài học</h1>
        <Button shape="circle" icon={<Plus />}></Button>
      </div>
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

export default LessonTable;
