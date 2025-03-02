import type { TableProps } from "antd";
import { Table } from "antd";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";

interface DataType {
  key: string;
  name: string;
  description: string;
  code: string;
  status: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  }
];

const data: DataType[] = [
  {
    key: "1",
    name: "Advanced Programming",
    description: "Advanced concepts in software development",
    code: "CS401",
    status: "active",
  },
];

function CourseList() {
  return (
    <DashboardLayout>
      <Table<DataType> columns={columns} dataSource={data} />
    </DashboardLayout>
  );
}

export default CourseList;
