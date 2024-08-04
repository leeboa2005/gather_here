"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/components/MainPage/Carousel/Carousel.css";
import { Navigation, Pagination, A11y } from "swiper/modules";
import ItEventCardShort from "@/components/MainPage/PageContent/ItEvent/Card/ItEventCardShort";

const Carousel: React.FC = () => {
  return (
    <div className="relative z-0 w-full flex justify-center">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={12}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
        breakpoints={{
          336: {
            slidesPerView: 1,
          },
          769: {
            slidesPerView: 3,
          },
          1068: {
            slidesPerView: 3,
          },
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="w-[237px]">
              <ItEventCardShort />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
