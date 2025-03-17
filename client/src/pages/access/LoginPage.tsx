import { GoogleLogo, IdentificationBadge, Kanban } from "@phosphor-icons/react";
import { Button, Divider, message } from "antd";
import React from "react";
import { replace, useNavigate } from "react-router-dom";
import bg from "../../assets/images/pexels-googledeepmind-25626517.jpg";
import LoginForm from "../../ui/_elements/Forms/Access/LoginForm";
import { getCurrentSeason } from "../../utils/customHooks";
import { useUserStore } from "../../utils/zustand/Store";
import { login } from "../../utils/api";
import { log } from "console";
import { UserToken } from "../../utils/interfaces";

const LoginPage: React.FC = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();
  const handleGoogleLogin = async () => {
    const width = 500;
    const height = 500;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      "http://localhost:5000/auth/google", // Make sure this matches your backend URL
      "googleLoginPopup",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const popupTick = setInterval(() => {
      if (popup?.closed) {
        clearInterval(popupTick);
        window.removeEventListener("message", handleMessage);
      }
    }, 500);

    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5000") {
        return;
      }

      const data = event.data;
      if (data.isOk) {
        setUser(data.user.user);
        localStorage.setItem(
          "edu-token",
          JSON.stringify(data.user as UserToken)
        );
        message.success("Đăng nhập thành công!");
        if (data.user.user.role == 1 || data.user.user.role == 2) {
          navigate(`/home/${year}/${month}`, { replace: true });
        } else {
          navigate(`/admin/course`, { replace: true });
        }
      } else {
        message.error(data.error || "Đăng nhập Google thất bại!");
      }

      window.removeEventListener("message", handleMessage);
      popup?.close();
    };

    window.addEventListener("message", handleMessage);
  };

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
                <Button
                  icon={<GoogleLogo size={22} />}
                  onClick={handleGoogleLogin}
                  className="play-fair"
                >
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
