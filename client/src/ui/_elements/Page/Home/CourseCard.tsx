import { ArrowFatLineRight, BookBookmark } from "@phosphor-icons/react";
import { Button, Divider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CourseItem } from "../../../../utils/interfaces";

const CourseCard: React.FC<{ item: CourseItem }> = ({ item }) => {
  
  const picSwapper = {
    "IT" : ,
    "MKT",
    "MC":,
    ""
  }
  const navigate = useNavigate();
  console.log(item);
  return (
    <div>
      <div>
        <img loading="lazy" />
      </div>
      <div>
        <h1></h1>
        <p></p>
      </div>
      <div>
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
};

export default CourseCard;
