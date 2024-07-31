"use client";
import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../../../assets/LoadingAnimation.json";

const LottiAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fafaf8]">
      <div className="relative w-64 h-64 sm:w-96 sm:h-96 lg:w-128 lg:h-128">
        <Lottie
          loop
          animationData={animationData}
          play
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default LottiAnimation;