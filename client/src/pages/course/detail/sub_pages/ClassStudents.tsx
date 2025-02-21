import { ArrowRight, DotsThreeVertical } from "@phosphor-icons/react";
import { Button, Divider, Segmented, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { getCourseStudents } from "../../../../utils/api";
import { useCourseStore } from "../../../../utils/zustand/Store";
import { User } from "../../../../utils/interfaces";

const ClassStudents = () => {
  const [loading, setLoading] = useState(false);
  const { detail } = useCourseStore();
  const [students, setStudents] = useState<User[]>([]);
  const getStudents = async () => {
    try {
      setLoading(true);
      const resp = await getCourseStudents(detail?._id || "");
      if (resp?.isOk) {
        setStudents(resp?.students);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      getStudents();
    };
  }, []);
  console.log(students);
  return (
    <>
      <div className="border-b border-[#ccc]">
        <div className="px-8 py-4 ">
          <h1 className="text-[22px] font-semibold">Class's Students</h1>
          <div className="pt-2">
            <Segmented<string>
              defaultValue="All"
              options={["Tất cả", "Đang hoạt động", "Không hoạt động"]}
            />
          </div>
        </div>
      </div>
      <div className="px-8 pt-4">
        <div className="flex flex-col gap-3">
          <p>
            <Tag color="#d3f8e3" className="text-[14px] text-black quick-sand">
              Số lượng học sinh Online
            </Tag>
            :{" "}
            <Tag color="#bae5f5" className="text-[16px] text-black quick-sand">
              {students.length - Math.floor(Math.random() * 10)}
            </Tag>
          </p>
          <p>
            <Tag color="#fde1ac" className="text-[14px] text-black quick-sand">
              Tổng số học sinh :
            </Tag>
            <Tag color="#bae5f5" className="text-[16px] text-black quick-sand">
              {students.length}
            </Tag>
          </p>
        </div>
      </div>
      <Divider className="border-[#ccc]" />
      <Spin spinning={loading}>
        <ul className="grid flex-wrap grid-cols-12 gap-2 px-4 justify-evenly">
          {!!students.length &&
            students.map((student, index) => (
              <li
                key={index}
                className=" col-span-3 grid grid-cols-12  border border-[#ccc] rounded-xl p-4 hover:border-blue-500  hover:bg-[#f9f9f9] ease-in-out cursor-pointer shadow-md"
              >
                <div className="flex flex-col col-span-6 gap-3">
                  <img
                    loading="lazy"
                    src={`https://api.dicebear.com/9.x/croodles/svg?seed=${index}`}
                    alt={student?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h1 className="text-[16px] font-semibold">
                      {student?.name}
                    </h1>
                    <p className="text-[12px] text-[#767a85]">
                      {student?.FEID}
                    </p>
                  </div>
                </div>
                <div className="grid justify-end col-span-6 gird-rows-2">
                  <div className="flex items-start ">
                    <Button
                      icon={<DotsThreeVertical size={20} />}
                      className="border-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      icon={<ArrowRight size={20} />}
                      className="shadow-md"
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </Spin>
    </>
  );
};

export default ClassStudents;
