import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex h-svh justify-center bg-[#f3f4f5] items-center">
      <div className="rounded-none card">
        <div className="loader">
          <p className="m-0">loading</p>
          <div className="words">
            <span className="word">buttons</span>
            <span className="word">forms</span>
            <span className="word">switches</span>
            <span className="word">cards</span>
            <span className="word">buttons</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
