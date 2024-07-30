import React from "react";

const FilterBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center mt-8 mb-3">
      <div className="flex space-x-2">
        <select className="px-2 py-1 text-center text-baseS text-labelAssistive bg-fillLight rounded-md">
          <option>직군</option>
          <option>프론트엔드</option>
          <option>백엔드</option>
        </select>
        <select className="px-2 py-1 text-center text-baseS text-labelAssistive bg-fillLight rounded-md">
          <option>온/오프라인</option>
          <option>온라인</option>
          <option>오프라인</option>
        </select>
        <select className="px-2 py-1 text-center text-baseS text-labelAssistive bg-fillLight rounded-md">
          <option>지역</option>
          <option>서울</option>
          <option>부산</option>
        </select>
        <select className="px-2 py-1 text-center text-baseS text-labelAssistive bg-fillLight rounded-md">
          <option>기간</option>
          <option>1개월</option>
          <option>3개월</option>
        </select>
      </div>
      {/* <button className="px-4 py-2 bg-black text-white rounded-full ">모집하기</button> */}
    </div>
  );
};

export default FilterBar;
