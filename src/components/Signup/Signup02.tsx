'use client';

import useSignupStore from '@/store/useSignupStore';
import React, { useState } from 'react';

const Signup02: React.FC = () => {
  const { nextStep, prevStep, setExperience } = useSignupStore();
  const [selectedExperience, setSelectedExperience] = useState<string>('');

  const handleExperienceSelection = (experience: string) => {
    setSelectedExperience(experience);
    setExperience(experience);
    nextStep();
  };

  return (
    <div className="s:w-[370px] s:h-[550px] w-[430px] h-[610px] relative bg-background rounded-[20px] p-4 select-none">
      {prevStep && (
        <button onClick={prevStep} className="absolute left-4 top-4 text-[c4c4c4]">
          &larr;
        </button>
      )}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex space-x-2">
        <div className="w-[136px] h-10 justify-start items-center gap-2 inline-flex">
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#28282a] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#5e5e5e] text-sm font-medium font-['Pretendard'] leading-[21px]">1</div>
          </div>
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#c3e88d] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#c3e88d] text-sm font-medium font-['Pretendard'] leading-[21px]">2</div>
          </div>
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#28282a] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#5e5e5e] text-sm font-medium font-['Pretendard'] leading-[21px]">3</div>
          </div>
        </div>
      </div>
      <div className="text-center text-2xl font-medium text-[#ffffff] leading-9 mt-16">
        얼마나 오래 하셨나요?
      </div>
      <div className="text-center text-[#9a9a9a] mt-2">
        경력에 맞게 닮고 싶은 시니어, <br /> 챙겨 주고 싶은 주니어를 소개해 드려요.
      </div>
      <div className="grid grid-cols-3 gap-1 s:mt-4 mt-8 s:w-[335px] w-[370px] mx-auto">
        {['1년 미만', '1년', '2년', '3년', '4년', '5년', '6년', '7년', '8년 이상'].map((experience) => (
          <button
          key={experience}
          onClick={() => handleExperienceSelection(experience)}
          className={`square-button square-button-default ${
            selectedExperience === experience ? 'bg-[#ffffff] text-[#c4c4c4] font-medium shadow-lg' : 'bg-[#343437] text-[#c4c4c4]'
          }`}
        >
          {experience}
        </button>
        ))}
      </div>
    </div>
  );
};

export default Signup02;