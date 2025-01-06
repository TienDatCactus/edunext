import {
  Cards,
  Certificate,
  CheckSquareOffset,
  ClockUser,
  Code,
  Exam,
  ExcludeSquare,
  Note,
  TextAlignLeft,
  Toolbox,
} from "@phosphor-icons/react";
import { Button, Divider, Modal } from "antd";
import React from "react";
import { CourseModalProps } from "../../../utils/interfaces";
import { Glassmorphism } from "../../../utils/styles/CustomStyles";
import ModalHeader from "./ModalHeader";

const CourseModal: React.FC<CourseModalProps> = ({
  setIsModalOpen,
  isModalOpen,
}) => {
  const handleOk = () => {
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };
  return (
    <Modal
      width={1000}
      className={Glassmorphism}
      title={<ModalHeader />}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          className="bg-[#1ca97d] text-white"
          onClick={handleOk}
        >
          Ok
        </Button>,
      ]}
    >
      <ul className="flex flex-wrap justify-evenly gap-4 [&_li]:flex [&_li]:gap-2 [&_li]:min-w-[200px] [&_li>div]:flex [&_li>div]:gap-2 [&_li>div]:text-[#6d7383] py-4 bg-none backdrop-blur-md rounded-lg shadow-md ">
        <li>
          <div>
            <Cards size={22} />
            <span>Course Name </span>
          </div>
          <p>2</p>
        </li>
        <li>
          <div>
            <Code size={22} />
            <span>Course Code</span>
          </div>
          <p>2</p>
        </li>
        <li>
          <div>
            <Certificate size={22} />
            <span>Degree Level</span>
          </div>
          <p>2</p>
        </li>
        <li>
          <div>
            <ClockUser size={22} />
            <span>Time Allocation</span>
          </div>
          <p>2</p>
        </li>
        <li>
          <div>
            <ExcludeSquare size={22} />
            <span>Pre-Requisite</span>
          </div>
          <p>MAE101 and MAS291</p>
        </li>
        <li>
          <div>
            <Exam size={22} />
            <span>Pass Average</span>
          </div>
          <p>2</p>
        </li>
      </ul>
      <Divider className="border-[#ccc] my-3" />
      <div className="py-2 rounded-lg shadow-md bg-none backdrop-blur-md">
        <div className="flex items-center gap-2 px-4 group">
          <TextAlignLeft
            size={36}
            className="p-2 border-[#ccc] border rounded-full "
          />
          <div>
            <h1 className="font-semibold text-[16px]">Description</h1>
            <p className="text-[12px] text-[#5e6678]">
              Brief description of the subject you viewing
            </p>
          </div>
        </div>
        <Divider className="border-[#ccc] my-2" />
        <div className="px-4 ">
          <p className="text-[#8a8a8a]">
            *Upon finishing the course, students must acquire:
          </p>
          <ol className="ml-4 list-decimal">
            <li>
              <strong>The following knowledge: (ABET a1)</strong>
              <ul className="ml-4 list-disc">
                <li>
                  The fundamental principles of probability and their
                  applications
                </li>
                <li>The frequently used probability distributions</li>
                <li>The basics of descriptive statistics</li>
                <li>
                  The inferences of statistics: parameter estimations,
                  hypothesis testing, regressions & correlations
                </li>
              </ul>
            </li>
            <li>
              <strong>The following skills: (ABET a2)</strong>
              <ul className="ml-4 list-disc">
                <li>
                  Recognize simple statistical models and apply them to solve
                  engineering problems
                </li>
                <li>
                  Use at least one statistical software (Excel, Maxima) for
                  problem solving
                </li>
                <li>Self-study skill (ABET i)</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 py-2 mt-4 rounded-lg shadow-md bg-none backdrop-blur-md">
          <div className="flex items-center gap-2 px-4 group">
            <CheckSquareOffset
              size={36}
              className="p-2 border-[#ccc] border rounded-full "
            />
            <div>
              <h1 className="font-semibold text-[16px]">Students Tasks</h1>
              <p className="text-[12px] text-[#5e6678]">
                Task for students of the subject you viewing
              </p>
            </div>
          </div>
          <Divider className="border-[#ccc] my-2" />
          <div className="px-4 ">
            <p>
              Students must attend at least 80% of contact hours in order to be
              accepted to the final examination.
            </p>
          </div>
        </div>
        <div className="col-span-1 py-2 mt-4 rounded-lg shadow-md bg-none backdrop-blur-md">
          <div className="flex items-center gap-2 px-4 group">
            <Toolbox
              size={36}
              className="p-2 border-[#ccc] border rounded-full "
            />
            <div>
              <h1 className="font-semibold text-[16px]">Tools</h1>
              <p className="text-[12px] text-[#5e6678]">
                Tools used for the subject you viewing
              </p>
            </div>
          </div>
          <Divider className="border-[#ccc] my-2" />
          <div className="px-4 ">
            <ul>
              <li> - Internet </li>
              <li>
                - Computerized tools (for example Excel and DDXL add-ons) (CT)
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-2 mt-4 rounded-lg shadow-md bg-none backdrop-blur-md">
        <div className="flex items-center gap-2 px-4 group">
          <Note size={36} className="p-2 border-[#ccc] border rounded-full " />
          <div>
            <h1 className="font-semibold text-[16px]">Notes</h1>
            <p className="text-[12px] text-[#5e6678]">
              Notes about the subject you viewing
            </p>
          </div>
        </div>
        <Divider className="border-[#ccc] my-2" />
        <div className="px-4 ">
          <p className="text-[#8a8a8a]">*On-going assessment:</p>
          <ul className="ml-4 list-disc">
            <li>03 progress tests: 30% (a1, i)</li>
            <li>02 assignments 20% (a2)</li>
            <li>01 computer project 15%</li>
          </ul>
          <p>
            <p>Final Examination 35% (a1, a2)</p>
            <p>Final results 100%</p>
            <p>
              Completion Criteria: Every on-going assessment component {">"} 0,
              Final Result {">= "}5 & Final Exam Score {">= "}4
            </p>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
