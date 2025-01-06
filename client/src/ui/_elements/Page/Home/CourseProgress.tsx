import { ChartBar } from "@phosphor-icons/react";
import { Button } from "antd";
import ProgressBar from "./sub_elements/ProgressBar";

const CourseProgress = () => {
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
        <ProgressBar />
        <ProgressBar />
        <ProgressBar />
        <ProgressBar />
      </ul>
    </div>
  );
};

export default CourseProgress;
