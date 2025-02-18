import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex h-svh justify-center bg-[#f3f4f5] items-center">
      <div className="rounded-none card">
        <div className="loader">
          <p className="m-0">đang tải</p>
          <div className="words">
            <span className="word">nút</span>
            <span className="word">biểu mẫu</span>
            <span className="word">footer</span>
            <span className="word">thẻ</span>
            <span className="word">header</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
