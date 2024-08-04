import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const ShareButton: React.FC = () => {
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL이 클립보드에 복사되었습니다!");
      })
      .catch(() => {
        toast.error("URL 복사에 실패했습니다.");
      });
  };

  return (
    <button type="button" onClick={handleShare} className="flex items-center mr-2">
      <Image src="/Main/share_button.png" alt="공유하기" width={20} height={20} />
    </button>
  );
};

export default ShareButton;
