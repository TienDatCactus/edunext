import { Progress } from "antd";

const ProgressBar = () => {
  return (
    <li className="px-2 py-4 border">
      <div>
        <Progress
          percent={30}
          size="default"
          showInfo={false}
          strokeLinecap="butt"
          strokeColor="#bae5f5"
        />
        <div className="flex items-center justify-between pt-2">
          <h1 className="text-[12px]">Hypertext Markup Language</h1>
          <p className="text-[12px] text-[#7a7a7a]">30/100</p>
        </div>
      </div>
    </li>
  );
};

export default ProgressBar;
