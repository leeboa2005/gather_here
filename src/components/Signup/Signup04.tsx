"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/provider/ContextProvider';
import useSignupStore from '@/store/useSignupStore';

const Signup04: React.FC = () => {
  const router = useRouter();
  const { nickname } = useSignupStore();
  const { closeModal } = useModal();

  const handleExplore = () => {
    closeModal();
    router.push("/");
  };

  return (
    <div className="s:w-[370px] s:h-[550px] w-[430px] h-[610px] relative bg-background rounded-[20px] p-4 select-none">
      <div className="text-center mt-8">
        <div className="w-full h-70 rounded-md mb-4 flex items-center justify-center overflow-hidden">
          <img src="/logos/6340259.jpg" alt="Welcome Image" className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="text-center s:pt-3 pt-6">
        <div className="text-center text-2xl font-medium text-[#ffffff]"> @gather_here에 <br />환영해요!</div>
        <div className="s:mt-6 mt-8 text-center text-[#] text-[#9a9a9a] text-m">
          {nickname} 님이 @gather_here에서
          <br /> 더 많은 경험을 할 수 있도록 도울게요
        </div>
      </div>
      <div className="absolute s:bottom-9 bottom-8 left-1/2 transform -translate-x-1/2 w-full px-4">
        <button
          onClick={handleExplore}
           className="w-full h-19 bg-[#343437] text-[#c3e88d] py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-[#343437] hover:text-white active:scale-95 active:bg-gray-800 active:text-gray-200"
        >
          둘러보기
        </button>
      </div>
    </div>
  );
};

export default Signup04;
