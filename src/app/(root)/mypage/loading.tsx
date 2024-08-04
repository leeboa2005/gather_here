import React from "react";
import LottiAnimation from "@/components/Loading/LottiAnimation";
import animationData from "@/assets/loadingBar.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-fillStrong">
      <LottiAnimation animationData={animationData} size="200px" />
    </div>
  );
};

export default Loading;
