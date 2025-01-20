import { Kanban } from "@phosphor-icons/react";
import { Button, Divider, Input } from "antd";
import React from "react";

const Footer = () => {
  const footerItems: Array<{ name: string; link: string }> = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Community", link: "/commu" },
  ];
  const footerSubItems: Array<{ name: string; link: string }> = [
    { name: "Terms", link: "/" },
    { name: "Privacy", link: "/about" },
    { name: "About", link: "/contact" },
  ];
  return (
    <footer className="bg-[#f9fafc] min-h-[200px] py-6 px-14">
      <div className="flex items-center justify-between pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Kanban size={32} />
            <h1 className="font-semibold text-[20px]">Sphere</h1>
          </div>
          <ul className="text-[14px] text-[#4c4c4c] pt-4 flex items-center gap-6 transition-all duration-1000">
            {!!footerItems.length &&
              footerItems?.map((item, index) => {
                return (
                  <li key={index} className="hover:font-bold">
                    <a href={item.link}>{item.name}</a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <h2 className=" text-[14px]">Nhận mail hỗ trợ</h2>
          <div className="flex gap-4 pt-2">
            <Input
              placeholder="Nhập email của bạn"
              id="email"
              className="border-[#bae5f5] outline-none placeholder:text-[#ccc] placeholder:text-[12px] focus:[box-shadow:none]"
            />
            <Button type="primary" className="bg-[#bae5f5] text-[#1e2032]">
              Gửi
            </Button>
          </div>
        </div>
      </div>
      <Divider className="border-[#ccc]" />
      <div className="flex items-center justify-between ">
        <div>
          <p className="text-[14px] text-[#4c4c4c]">
            © 2024 by TienDat/MinhDuc. All rights reserved.
          </p>
        </div>
        <div>
          <ul className="text-[14px] text-[#4c4c4c] flex items-center gap-6 transition-all duration-1000">
            {!!footerSubItems.length &&
              footerSubItems?.map((item, index) => {
                return (
                  <li key={index} className="hover:font-bold">
                    <a href={item.link}>{item.name}</a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
