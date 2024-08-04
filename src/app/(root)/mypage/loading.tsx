import React from "react";
import dynamic from "next/dynamic";
import animationData from "@/assets/loadingBar.json";

const LottiAnimation = dynamic(() => import("@/components/Loading/LottiAnimation"), {
  ssr: false,
});

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-background">
      <LottiAnimation animationData={animationData} size="200px" />
    </div>
  );
};

export default Loading;
