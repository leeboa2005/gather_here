'use client';

import useSignupStore from '@/store/useSignupStore';
import React, { useState } from 'react';

const Signup01: React.FC = () => {
  const { nextStep, setJob } = useSignupStore();
  const [selectedJob, setSelectedJob] = useState<string>('');

  const handleJobSelection = (job_title: string) => {
    setSelectedJob(job_title);
    setJob(job_title);
    nextStep();
  };

  const jobClasses: { [key: string]: string } = {
    '프론트엔드': 'button-frontend',
    '백엔드': 'button-backend',
    'IOS': 'button-ios',
    '안드로이드': 'button-android',
    '데브옵스': 'button-devops',
    '기획자': 'button-pm',
    '디자인': 'button-designer',
    '마케팅': 'button-marketer',
    '기타': 'button-default',
  };

 return (
  <div className="s:w-[370px] s:h-[550px] w-[430px] h-[610px] relative bg-fillStrong rounded-[20px] p-4 select-none">
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
    <div className="text-center text-2xl font-medium text-[#ffffff] leading-9 mt-16">
      어떤 일을 하고 계신가요?
    </div>
    <div className="text-center text-[#9a9a9a] mt-2">
      직무와 관련된 스터디 및 프로젝트, <br /> 다양한 IT행사를 추천해 드려요.
    </div>
    <div className="grid grid-cols-3 s:gap-[2] gap-4 mt-3 s:w-[335px] w-[370px] mx-auto">
      {['프론트엔드', '백엔드', 'IOS', '안드로이드', '데브옵스', '기획자', '디자인', '마케팅', 'PM'].map((job) => (
        <button
          key={job}
          onClick={() => handleJobSelection(job)}
          className={`square-button ${jobClasses[job]} ${selectedJob === job ? 'bg-[#343434] text-[#c4c4c4] font-medium shadow-lg' : 'bg-[#343437] text-[#c4c4c4]'}`}
        >
          {job}
        </button>
      ))}
    </div>
  </div>
);
};

export default Signup01;