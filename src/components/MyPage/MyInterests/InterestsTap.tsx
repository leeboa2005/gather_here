"use client";

import React, { useState } from "react";

type Tab = "전체" | "스터디" | "프로젝트" | "IT 행사";

const InterestsTap: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("전체");

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="relative">
      <div className="sticky z-10 border-fillNeutral border-b-[1px]  s:relative s:top-auto">
        <div className="flex space-x-4 sm:space-x-2">
          <button
            className={`px-4 py-2 s:px-2 sm:py-1  ${
              selectedTab === "전체" ? "font-bold border-b-[1px] border-fontWhite" : ""
            }`}
            onClick={() => handleTabClick("전체")}
          >
            전체
          </button>
          <button
            className={`px-4 py-2 s:px-2 sm:py-1 ${
              selectedTab === "스터디" ? "font-bold border-b-[1px] border-fontWhite" : ""
            }`}
            onClick={() => handleTabClick("스터디")}
          >
            스터디
          </button>
          <button
            className={`px-4 py-2 s:px-2 sm:py-1 ${
              selectedTab === "프로젝트" ? "font-bold border-b-[1px] border-fontWhite" : ""
            }`}
            onClick={() => handleTabClick("프로젝트")}
          >
            프로젝트
          </button>
          <button
            className={`px-4 py-2 s:px-2 sm:py-1 ${
              selectedTab === "IT 행사" ? "font-bold border-b-[1px] border-fontWhite" : ""
            }`}
            onClick={() => handleTabClick("IT 행사")}
          >
            IT 행사
          </button>
        </div>
      </div>
      <div className="mt-4">
        {selectedTab === "전체" && <div>전체 영역 내용</div>}
        {selectedTab === "스터디" && <div>스터디 영역 내용</div>}
        {selectedTab === "프로젝트" && <div>프로젝트 영역 내용</div>}
        {selectedTab === "IT 행사" && <div>IT 행사 영역 내용</div>}
      </div>
    </div>
  );
};

export default InterestsTap;
