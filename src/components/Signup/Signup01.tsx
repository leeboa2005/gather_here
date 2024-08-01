'use client';

import useUserStore from '@/store/useUserStore';
import React, { useState } from 'react';

const Signup01: React.FC = () => {
  const { nextStep, setJob } = useUserStore();
  const [selectedJob, setSelectedJob] = useState<string>('');

  const handleJobSelection = (job_title: string) => {
    setSelectedJob(job_title);
    setJob(job_title);
    nextStep();
  };

  return (
    <div className="w-[400px] h-[550px] relative bg-background rounded-[20px] p-3 pl-6">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex space-x-2">
        <div className="w-[136px] h-10 justify-start items-center gap-2 inline-flex">
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#c3e88d] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#c3e88d] text-sm font-medium font-['Pretendard'] leading-[21px]">1</div>
          </div>
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#28282a] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#5e5e5e] text-sm font-medium font-['Pretendard'] leading-[21px]">2</div>
          </div>
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#28282a] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#5e5e5e] text-sm font-medium font-['Pretendard'] leading-[21px]">3</div>
          </div>
        </div>
      </div>
      <div className="text-center text-2xl font-medium text-#ffffff leading-9 mt-16">
        어떤 일을 하고 계신가요?
      </div>
      <div className="text-center text-[#9a9a9a] mt-2">
        직무와 관련된 스터디 및 프로젝트, <br /> 다양한 IT행사를 추천해 드려요.
      </div>
      <div className="grid grid-cols-3 gap-3 mt-8">
        {['프론트엔드', '백엔드', 'IOS', '안드로이드', '데브옵스', '기획자', '디자인', '마케팅', '기타'].map((job) => (
        <button
          key={job}
          onClick={() => handleJobSelection(job)}
          className={`w-[91px] h-[91px] p-3 rounded-xl text-center transition-all duration-300 transform hover:scale-105 hover:bg-[#808588] hover:text-white ${
            selectedJob === job ? 'bg-[#343434] text-[#c4c4c4] text-base font-mediumshadow-lg' : 'bg-[#343437] text-#c4c4c4'
          }`}
        >
          {job}
       </button>
        ))}
      </div>
    </div>
  );
};

export default Signup01;