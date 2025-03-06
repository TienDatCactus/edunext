import { CellSignalHigh } from "@phosphor-icons/react";
import { Button, Col, Skeleton, Tag } from "antd";
import { motion } from "motion/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalCourse } from "../../../../utils/interfaces";
import { LinkBreak } from "phosphor-react";
const ExternalCourseCard: React.FC<{ props: ExternalCourse }> = ({ props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  return (
    <Col span={8}>
      <li className="bg-[#fdfbf9] rounded-lg border-[#d9d9d9] border">
        <div className="relative rounded-t-lg">
          <Skeleton.Image
            active
            className={`${
              !imageLoaded ? "flex" : "hidden"
            } w-full h-52 object-cover rounded-t-md`}
          />
          <img
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            src={props?.photoUrl}
            alt={props?.name}
            className={`${
              !imageLoaded && "hidden"
            } object-cover w-full rounded-t-md min-h-48 max-h-52`}
          />

          <Tag className="absolute top-2 left-2 bg-[#edc769] rounded-md border-none dm-sans">
            {props?.language}
          </Tag>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="">
            <h1 className=" my-1 truncate font-semibold text-[1.25rem]">
              {props?.name}
            </h1>
            <p className=" line-clamp-3">{props?.description}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="">
              By :{" "}
              <span className="text-[1rem] font-semibold play-fair italic">
                Coursera
              </span>
            </p>
            <div className="flex items-center gap-1">
              <CellSignalHigh size={16} />
              <p>
                Level : <span>Beginner</span>
              </p>
            </div>
            <div className="w-full overflow-hidden">
              <motion.ul
                className="flex items-center gap-2 whitespace-nowrap"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              >
                {!!props?.domainTypes?.length &&
                  [...props?.domainTypes, ...props?.domainTypes].map(
                    (item, index) => {
                      return (
                        <li key={index}>
                          <Tag className="border-[1.5px] quick-sand border-black rounded-none text-[0.625rem]">
                            {item.domainId}
                          </Tag>
                        </li>
                      );
                    }
                  )}
              </motion.ul>
            </div>
            <div className="flex justify-end mt-2">
              <Button type="dashed" icon={<LinkBreak />}>
                <Link to={props?.previewLink} target="_blank  ">
                  {" "}
                  View
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </li>
    </Col>
  );
};

export default ExternalCourseCard;
