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
    <div className="w-[400px] h-[500px] relative bg-white rounded-[20px] p-4">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex space-x-2">
        <div className="w-5 h-5 bg-gray-800 flex items-center justify-center text-white rounded-md">1</div>
        <div className="w-5 h-5 bg-gray-300 flex items-center justify-center text-black rounded-md">2</div>
        <div className="w-5 h-5 bg-gray-300 flex items-center justify-center text-black rounded-md">3</div>
      </div>
      <div className="text-center text-2xl font-medium text-gray-700 leading-9 mt-16">
        어떤 일을 하고 계신가요?
      </div>
      <div className="text-center text-gray-500 mt-2">
        업무 분야에 따라 핫한 이슈와 <br /> 다양한 행사, 참신한 프로젝트를 추천해 드려요.
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {['프론트엔드', '백엔드', 'IOS', '안드로이드', '데브옵스', '기획자', '디자인', '마케팅', '기타'].map((job) => (
        <button
          key={job}
          onClick={() => handleJobSelection(job)}
          className={`p-4 rounded-md text-center transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 hover:text-white ${
            selectedJob === job ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-200 text-gray-800'
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