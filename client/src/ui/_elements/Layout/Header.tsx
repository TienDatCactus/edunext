import { BellZ, Kanban, UserGear } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { User, UserToken } from "../../../utils/interfaces";
import { getCurrentSeason } from "../../../utils/customHooks";

const Header = () => {
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();
  const navItems: Array<{ name: string; link: string; active: boolean }> = [
    { name: "Trang chủ", link: "/", active: true },
    { name: "Các môn học", link: `/home/${year}/${month}`, active: false },
  ];
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem("edu-token");
  const userToken = token ? (JSON.parse(token) as UserToken) : null;
  useEffect(() => {
    return () => {
      if (userToken) {
        return setUser(userToken?.user);
      }
    };
  }, []);
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 animate-jackInTheBox animate-fast">
          <Kanban size={32} />
          <h1 className="font-bold text-[20px]">FPT Edunext</h1>
        </div>
        <ul className="text-[14px] text-black">
          {!!navItems.length &&
            navItems?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="inline-block mx-4 animate-fadeInUp hover:scale-110 animate-fast"
                >
                  <a
                    href={item.link}
                    className={`${item.active ? "font-bold" : ""}`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{user?.name}</p>
          <img
            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.userId}`}
            alt="dat"
            className="w-10 h-10 bg-white border-2 rounded-full"
          />
        </div>
        <ul className="flex items-center gap-4 transition-all duration-100">
          <li>
            <a href="/dashboard">
              <UserGear size={22} className="cursor-pointer hover:scale-110 " />
            </a>
          </li>
          <li>
            <BellZ size={22} className="cursor-pointer hover:scale-110" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
