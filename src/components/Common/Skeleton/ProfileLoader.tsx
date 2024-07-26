import React from "react";

const SkeletonLoader: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className, children }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 w-full h-full">{children}</div>
    </div>
  );
};

export default SkeletonLoader;
