import React from 'react';

interface SkipButtonProps {
  onSkip: () => void;
}

const SkipButton: React.FC<SkipButtonProps> = ({ onSkip }) => {
  return (
    <button 
      onClick={onSkip} 
      className="absolute top-10 right-9 text-[#c4c4c4] text-sm font-medium hover:text-[#f0f0f0] hover:bg-[#5e5e5e]"
    >
      건너뛰기
    </button>
  );
};

export default SkipButton;