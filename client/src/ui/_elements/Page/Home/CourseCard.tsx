import { ArrowFatLineRight, BookBookmark } from "@phosphor-icons/react";
import { Button, Divider, message } from "antd";
import React from "react";
import { CourseItem } from "../../../../utils/interfaces";
import { CustomPaperCard } from "../../../../utils/styles/CustomStyles";
import { useNavigate } from "react-router-dom";

const CourseCard: React.FC<{ item: CourseItem }> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className={CustomPaperCard}>
      <div className="flex flex-col justify-between h-full p-4">
        <div className="h-[20%]">
          <BookBookmark size={28} />
        </div>
        <div className="h-[40%] text-[18px] font-medium flex flex-col justify-around">
          <h1 className="text-[24px]">{item?.courseName}</h1>
          <p className="text-[14px] text-[#656565]">#{item?.courseCode}</p>
        </div>
        <div className="h-[40%] text-[18px]">
          <Divider className="border-[#000]" />
          <Button
            icon={<ArrowFatLineRight size={22} />}
            block
            onClick={() => navigate(`/course/${item?.courseCode}/detail`)}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
