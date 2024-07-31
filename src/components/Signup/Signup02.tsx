'use client';

import useUserStore from '@/store/useUserStore';
import React, { useState } from 'react';

const Signup02: React.FC = () => {
  const { nextStep, prevStep, setExperience } = useUserStore();
  const [selectedExperience, setSelectedExperience] = useState<string>('');

  const handleExperienceSelection = (experience: string) => {
    setSelectedExperience(experience);
    setExperience(experience);
    nextStep();
  };

  return (
    <div className="w-[400px] h-[500px] relative bg-white rounded-[20px] p-4">
      <button onClick={prevStep} className="absolute left-4 top-4 text-gray-500">
        &larr;
      </button>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex space-x-2">
        <div className="w-5 h-5 bg-gray-300 flex items-center justify-center text-black rounded-md">1</div>
        <div className="w-5 h-5 bg-gray-800 flex items-center justify-center text-white rounded-md">2</div>
        <div className="w-5 h-5 bg-gray-300 flex items-center justify-center text-black rounded-md">3</div>
      </div>
      <div className="text-center text-2xl font-medium text-gray-700 leading-9 mt-16">
        얼마나 오래 하셨나요?
      </div>
      <div className="text-center text-gray-500 mt-2">
        경력에 맞게 닮고 싶은 시니어, <br /> 챙겨 주고 싶은 주니어를 소개해 드려요.
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {['1년 미만', '1년', '2년', '3년', '4년', '5년', '6년', '7년', '8년 이상'].map((experience) => (
          <button
          key={experience}
          onClick={() => handleExperienceSelection(experience)}
          className={`p-4 rounded-md text-center transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 hover:text-white ${
            selectedExperience === experience ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-200 text-gray-800'
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