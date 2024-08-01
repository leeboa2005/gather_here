"use client";
import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../../../assets/LoadingAnimation.json";

interface LottiAnimationProps {
  size?: string;
  isFixed?: boolean;
  className?: string;
}

const LottiAnimation: React.FC<LottiAnimationProps> = ({ size = '100%', isFixed = false, className = '' }) => {
  return (
    <div className={`${isFixed ? 'fixed inset-0' : 'relative'} flex items-center justify-center bg-background ${className}`} style={{ width: size, height: size }}>
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottiAnimation;