'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/provider/ContextProvider';
import useUserStore from '@/store/useUserStore';

const Signup04: React.FC = () => {
  const router = useRouter();
  const { job_title, experience, nickname, blog, prevStep } = useUserStore();
  const { closeModal } = useModal();
  
  const handleExplore = () => {
    closeModal();
    router.push('/');
  };

  return (
    <div className="w-[400px] h-[600px] relative bg-white rounded-[20px] p-4">
      <div className="text-center mt-8">
        <div className="w-full h-80 rounded-md mb-4 flex items-center justify-center overflow-hidden">
          <img
            src="/logos/6340259.jpg"
            alt="Welcome Image"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
      <div className="text-center mt-6">
        <div className="text-center text-2xl font-medium text-gray-800">환영해요!</div>
        <div className="mt-2 text-center text-gray-600 text-m">
          {nickname}님이 @gather_here에서<br/> 더 많은 경험을 할 수 있도록 도울게요
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4">
        <button
          onClick={handleExplore}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-800 hover:text-white active:scale-95 active:bg-gray-800 active:text-gray-200"
        >
          구경하러 가기
        </button>
      </div>
    </div>
  );
};

export default Signup04;