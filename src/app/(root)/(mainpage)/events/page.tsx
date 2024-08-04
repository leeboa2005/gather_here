"use client";
import React from "react";
import ItEventCardLong from "@/components/MainPage/PageContent/ItEvent/Card/ItEventCardLong";
import Image from "next/image";
import run from "@/../public/Main/run.png";
import Carousel from "@/components/MainPage/PageContent/ItEvent/ItCarousel/Carousel";

const EventPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center my-4">
        <Image src={run} alt="run" width={17} />
        <h1 className="text-base font-base ml-2">모집이 곧 종료돼요</h1>
      </div>
      <div className="flex justify-center mb-8">
        <Carousel />
      </div>
      <ItEventCardLong />
    </div>
  );
};

export default EventPage;
