import { CaretRight, PaperPlaneRight } from "@phosphor-icons/react";
import { Button, List, Tag, Tooltip } from "antd";
import React, { useEffect } from "react";
import {
  useExternalCourseStore,
  useUserStore,
} from "../../../../../utils/zustand/Store";
const CourseraBlock: React.FC = () => {
  const { getKeyword, user } = useUserStore();
  const keyword = user && getKeyword ? getKeyword(user) : "";
  const { fetchCourseraCourses, coursera, loading } = useExternalCourseStore();
  useEffect(() => {
    return () => {
      fetchCourseraCourses(keyword);
    };
  }, []);
  return (
    <div className="p-4 bg-white shadow-md rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.5rem] text-[#878787]">Nền tảng khác</p>
          <h1 className="text-[1.125rem] font-semibold">Các môn học tự chọn</h1>
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
                title={() => <p className="truncate">{item?.description}</p>}
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
  );
};

export default CourseraBlock;
