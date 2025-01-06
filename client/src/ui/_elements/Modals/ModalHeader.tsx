import { ArticleNyTimes, Books, Check, Notebook } from "@phosphor-icons/react";
import { Badge, Button } from "antd";
import React from "react";

const ModalHeader = () => {
  return (
    <div className="border-b border-[#ccc] pb-3">
      <div className="flex items-center gap-2 *:text-[12px] *:text-[#586072] *:font-medium pb-1">
        <span>Created at 4PM, Apr 23</span>
        <Badge status="default" />
        <div className="flex items-center gap-1">
          <Check size={20} />
          <span>Saved 2min ago</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Books
            size={42}
            className="bg-[#cfcfcf] p-2 rounded-lg shadow-md hover"
          />
          <h1 className="text-[28px]">Course Preview</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<Notebook size={22} />}>To FLM</Button>
          <Button
            icon={<ArticleNyTimes size={22} />}
            className="bg-[#1ca97d] text-white "
          >
            To CMS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
