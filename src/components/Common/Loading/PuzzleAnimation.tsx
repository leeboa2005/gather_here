import React from "react";
import Image from "next/image";

const PuzzleAnimation = () => {
  return (
    <div className="relative w-[324px] h-[72px] s:w-[300px] s:h-[67px]">
      <Image src="/assets/gif/Loading-Large.gif" alt="Puzzle Icon" layout="fill" objectFit="contain" />
    </div>
  );
};

export default PuzzleAnimation;
