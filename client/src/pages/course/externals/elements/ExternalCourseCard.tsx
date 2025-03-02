import { Col, Tag } from "antd";
import React from "react";
import { animate, motion } from "motion/react";
import { ExternalCourse } from "../../../../utils/interfaces";
import { CellSignalHigh } from "@phosphor-icons/react";
const ExternalCourseCard: React.FC<{ props: ExternalCourse }> = ({ props }) => {
  return (
    <Col span={8}>
      <li className="bg-[#fdfbf9] rounded-lg border-[#d9d9d9] border">
        <div className="relative rounded-t-lg">
          <img
            loading="lazy"
            src={props?.photoUrl}
            alt={props?.name}
            className="object-cover w-full rounded-t-md min-h-48 max-h-52"
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
            <motion.ul
              className="flex items-center gap-2 overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {!!props?.domainTypes?.length &&
                props?.domainTypes.map((item, index) => {
                  return (
                    <li key={index}>
                      <Tag className="border-[1.5px] quick-sand border-black rounded-none text-[0.625rem]">
                        {item.domainId}
                      </Tag>
                    </li>
                  );
                })}
            </motion.ul>
          </div>
        </div>
      </li>
    </Col>
  );
};

export default ExternalCourseCard;
