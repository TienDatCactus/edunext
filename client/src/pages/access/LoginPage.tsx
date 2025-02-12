import { GoogleLogo, IdentificationBadge, Kanban } from "@phosphor-icons/react";
import { Button, Divider } from "antd";
import React from "react";
import bg from "../../assets/images/pexels-googledeepmind-25626517.jpg";
import LoginForm from "../../ui/_elements/Forms/Access/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center play-fair h-svh"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="py-4 bg-white shadow-2xl rounded-2xl ">
        <div className="flex flex-col px-6 justify-evenly">
          <div className="px-8">
            <div>
              <Kanban size={32} weight="fill" className="" />
            </div>
            <div className="flex flex-col items-center gap-6 pb-0">
              <div className="text-center">
                <h1 className="text-[30px]">Đăng nhập vào hệ thống</h1>
                <p className="text-[12px]">
                  Nhập thông tin cần thiết để truy cập tài khoản
                </p>
              </div>
              <div className="flex items-center gap-4 *:py-5 *:rounded-2xl  justify-center">
                <Button icon={<GoogleLogo size={22} />} className="play-fair">
                  Đăng nhập với Google
                </Button>
                <Button
                  icon={<IdentificationBadge size={22} />}
                  className="play-fair"
                >
                  Đăng nhập với FEID
                </Button>
              </div>
              <Divider className="border-[#ccc] text-[12px] font-light text-[#717171] m-0">
                hoặc
              </Divider>
            </div>
          </div>
          <div className="px-10">
            <LoginForm />
            <p className="text-center text-[12px] text-[#3f3f3f]">
              ©2024 TienDat, All righst reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
