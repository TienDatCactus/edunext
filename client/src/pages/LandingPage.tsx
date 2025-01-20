import {
  ArrowBendRightDown,
  ArrowBendRightUp,
  Kanban,
} from "@phosphor-icons/react";
import bg from "../assets/images/pexels-googledeepmind-25626520.jpg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentSeason } from "../utils/customHooks";
const LandingPage = () => {
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();
  const navigate = useNavigate();
  const menuItems: Array<{
    label: string;
    href: string;
    hasChild: boolean;
    childItems?: Array<{
      label: string;
      href: string;
    }>;
  }> = [
    {
      label: "Home",
      href: "/",
      hasChild: false,
    },
    {
      label: "About",
      href: "/about",
      hasChild: false,
    },
    {
      label: "Services",
      href: "/services",
      hasChild: true,
      childItems: [
        {
          label: "Web Development",
          href: "/services/web-development",
        },
        {
          label: "Mobile Development",
          href: "/services/mobile-development",
        },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      hasChild: false,
    },
  ];
  const handleNavigate = () => {
    navigate(`/home/${year}/${month}`);
  };
  return (
    <div
      className="container-xl h-svh"
      style={{
        background: `url(${bg}) no-repeat center center/cover`,
      }}
    >
      <div className="px-20 py-10 " id="header">
        <div className="flex items-center justify-between p-6 text-white rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Kanban size={32} />
            Sphere
          </div>
          <ul className="flex gap-10">
            {!!menuItems.length &&
              menuItems?.map((item, index) => {
                return (
                  <li
                    className={`cursor-pointer ${
                      item?.hasChild ? "flex items-center" : ""
                    }`}
                  >
                    <a href={item?.href}>{item?.label} </a>
                    <span>
                      {item?.hasChild ? <ArrowBendRightDown size={20} /> : ""}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="px-20">
        <div className="leading-[60px] text-white">
          <h1 className="dm-sans text-[40px]">Sphere</h1>
          <p className="italic play-fair text-[60px]">Nền tảng học tập mới</p>
        </div>
        <div className="flex pt-6 ">
          <Button
            icon={<ArrowBendRightUp size={18} />}
            iconPosition="end"
            className="justify-center shadow-lg items-center flex gap-2 bg-[#d0cdc6] py-5 rounded-full border-[1.5px] border-[#193719] cursor-pointer hover:text-[#000]  "
            onClick={handleNavigate}
          >
            Trải nghiệm ngay
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 px-20 pt-16 text-white">
        <div>
          <p className="leading-5 text-[14px] w-[90%]">
            Sphere là nền tảng quản lý học tập trực tuyến hiện đại của Đại học
            FPT, được thiết kế nhằm nâng cao hiệu quả học tập và trải nghiệm
            giáo dục cho sinh viên. Sphere cung cấp các tính năng toàn diện, từ
            quản lý thông tin sinh viên, cập nhật lịch học, đăng ký môn học đến
            việc theo dõi tiến độ học tập và đánh giá kết quả học tập, cho phép
            sinh viên truy cập tài liệu học tập, nộp bài tập, tham gia các hoạt
            động lớp học trực tuyến, và nhận phản hồi từ giảng viên một cách
            thuận tiện.
          </p>
        </div>
        <div>
          <h1 className="flex justify-end italic play-fair text-[60px]">
            cho sinh viên FPTU
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
