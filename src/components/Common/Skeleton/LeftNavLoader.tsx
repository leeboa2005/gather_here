import React from "react";

const LeftNavLoader: React.FC = () => {
  return (
    <div className="animate-pulse flex items-center gap-3 mb-5">
      <div className="w-20 h-20 m:w-16 m:h-16 bg-gray-200 rounded-full"></div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default LeftNavLoader;
