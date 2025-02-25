import { ChartBar } from "@phosphor-icons/react";
import { Button, Steps, Tag } from "antd";
import ProgressBar from "./sub_elements/ProgressBar";
import { useCourseStore } from "../../../../utils/zustand/Store";
import { title } from "process";

const CourseProgress = () => {
  const { courses } = useCourseStore();
  console.log(courses);
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-h-[490px] overflow-y-scroll scrollbar-none">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-semibold">Tiến trình học</h1>
        <Button
          icon={<ChartBar size={22} />}
          className="bg-[#f6f6f6] border-none rounded-none"
        />
      </div>
      <ul className="flex flex-col gap-4 pt-2 ">
        <Steps
          direction="vertical"
          current={1}
          items={
            courses?.length
              ? courses.map((c, index) => ({
                  title: (
                    <div className="flex items-start gap-2">
                      <h1>{c?.courseCode}</h1>
                      <Tag
                        className="border-none quick-sand"
                        color={c?.status == "active" ? "blue" : "warning"}
                      >
                        {c?.status == "active"
                          ? "Đang hoạt động"
                          : "Ngưng hoạt động"}
                      </Tag>
                    </div>
                  ),
                  description: c?.courseName,
                }))
              : []
          }
        />
      </ul>
    </div>
  );
};

export default CourseProgress;
