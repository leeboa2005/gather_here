"use client";
import React, { useEffect, useState } from "react";
import ItEventCardLong from "@/components/MainPage/PageContent/ItEvent/ItEventCardLong";
import Image from "next/image";
import run from "@/../public/Main/run.png";
import Carousel from "@/components/MainPage/PageContent/ItEvent/ItCarousel/Carousel";

const ItEventContent: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1068);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className={`flex ${isMobile ? "flex-col" : "space-x-4"}`}>
        <div className={`w-full ${!isMobile ? "md:w-2/3" : ""}`}>
          <div className="max-w-[744px] mx-auto mb-8">
            <div className="flex items-center">
              <Image src={run} alt="run" width={17} />
              <h1 className="text-base font-base ml-2">모집이 곧 종료돼요</h1>
            </div>
            <div className="flex justify-center">
              <Carousel posts={[]} />
            </div>
          </div>
          <div className="max-w-[744px] mx-auto">
            <ItEventCardLong />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItEventContent;
