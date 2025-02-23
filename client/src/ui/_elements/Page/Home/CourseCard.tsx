import {
  ArrowFatLineRight,
  ArrowRight,
  BookBookmark,
} from "@phosphor-icons/react";
import { Button, Divider, Tag, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CourseItem } from "../../../../utils/interfaces";
import it from "../../../../assets/images/wallhaven-x892zz_3840x2160.png";
import mkt from "../../../../assets/images/pexels-energepic-com-27411-159888.jpg";
import mc from "../../../../assets/images/pexels-picjumbo-com-55570-196645.jpg";
import { useUserStore } from "../../../../utils/zustand/Store";
import { DotsThree } from "@phosphor-icons/react/dist/ssr";
const CourseCard: React.FC<{ item: CourseItem }> = ({ item }) => {
  console.log(item);
  const picSwapper: { [key in "IT" | "MKT" | "MC"]: string } = {
    IT: it,
    MKT: mkt,
    MC: mc,
  };
  const navigate = useNavigate();
  console.log(item);
  return (
    <div className="relative">
      <img
        className="relative w-full h-full rounded-2xl"
        src={
          item?.forMajor && picSwapper[item.forMajor as "IT" | "MKT" | "MC"]
            ? picSwapper[item.forMajor as "IT" | "MKT" | "MC"]
            : ""
        }
      />
      <div className="absolute inset-0 flex flex-col items-start justify-between p-3">
        <div className="flex items-center justify-between w-full">
          <Tag className="text-white bg-gray-300 border-none rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 dm-sans">
            {item?.forMajor}
          </Tag>
          <Button
            shape="circle"
            className="text-white bg-gray-300 border-none rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 dm-sans"
          >
            <DotsThree />
          </Button>
        </div>
        <div className="flex items-center justify-between ">
          <Tooltip title={item?.description}>
            <h1 className="text-white text-[1rem] font-semibold">
              {item?.courseName}
            </h1>
          </Tooltip>
          <Button
            icon={<ArrowRight />}
            className="text-white bg-gray-100 bg-opacity-50 border-none rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm"
            iconPosition="end"
            onClick={() => navigate(`/course/${item?.courseCode}/detail`)}
          >
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
