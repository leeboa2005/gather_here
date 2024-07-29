'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useSignupStore from '@/store/useSignupStore';
import { useModal } from '@/provider/ContextProvider'; // useModal 훅 임포트

const Signup04: React.FC = () => {
  const router = useRouter();
  const { job_title, experience, nickname, blog, prevStep } = useSignupStore();
  const { closeModal } = useModal(); // closeModal 함수 가져오기
  
  const handleExplore = () => {
    closeModal(); // 모달 닫기
    router.push('/');
    console.log("Signup completed:", { job_title, experience, nickname, blog }); // 콘솔 로그 추가
  };

  return (
    <div className="w-[400px] h-[400px] relative bg-white rounded-[20px] ">
      <div className="text-center mt-8">
        <div className="text-2xl font-medium text-gray-800">회원가입이 완료되었어요</div>
        <div className="mt-2 text-center text-gray-600 text-m font-semibold italic">
            Welcome to @gather_here
        </div>
        <div className="w-full h-40 rounded-md mb-4 flex items-center justify-center overflow-hidden">
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              이미지?
            </div>
        </div>
        <div className="mt-4 text-left text-gray-600">
          <p><strong>닉네임:</strong> {nickname}</p>
          <p><strong>직업:</strong> {job_title}</p>
          <p><strong>경력:</strong> {experience}</p>
          <p><strong>블로그:</strong> {blog}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full px-4">
        <button
          onClick={handleExplore}
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
        >
          구경가기
        </button>
      </div>
    </div>
  );
};

export default Signup04;