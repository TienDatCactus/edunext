import { ChartPieSlice, FileJs, Notebook } from "@phosphor-icons/react";
import { Badge, Button } from "antd";

const ListItem = () => {
  return (
    <li className="grid grid-cols-12">
      <div className="flex items-center col-span-2">
        <p className="text-[12px] text-[#9b9ba0]">12:40PM</p>
      </div>
      <div className="flex items-center justify-between col-span-8">
        <div className="flex items-center gap-2">
          <FileJs size={42} className="bg-[#e1d2ff] p-2" />
          <div>
            <h1 className="font-semibold text-[16px]">Machine Learning</h1>
            <div className="flex items-center gap-2 text-[12px] text-[#575757]">
              <p>Lecturer: Nigga dat</p>
              <Badge color="#ccc" />
              <p>Google Meet</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 *:border-none">
          <Button icon={<Notebook size={26} />} />
          <Button icon={<ChartPieSlice size={26} />} />
        </div>
      </div>
      <div className="*:text-end col-span-2">
        <h1 className="text-[16px] font-semibold">Lesson 4</h1>
        <p className="text-[12px] text-[#575757]">50 min</p>
      </div>
    </li>
  );
};

export default ListItem;
