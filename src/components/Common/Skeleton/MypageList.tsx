import React from "react";

const MypageList: React.FC = () => {
  return (
    <div className="w-[237px] s:w-full p-8 h-72 m-2 bg-fillAssistive rounded-2xl animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-16 bg-fillLight rounded-full"></div>
        <div className="h-6 w-5 bg-fillLight rounded-full"></div>
      </div>
      <div className="h-6 bg-fillLight rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-fillLight rounded mb-2"></div>
      <div className="flex items-center mt-16 mb-4">
        <div className="h-6 bg-fillLight rounded w-1/4 mr-3"></div>
        <div className="h-6 bg-fillLight rounded w-1/6"></div>
      </div>
      <div className="h-8 bg-fillLight rounded mb-2"></div>
    </div>
  );
};

export default MypageList;
