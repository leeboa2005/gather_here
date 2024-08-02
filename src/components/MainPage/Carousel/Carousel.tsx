"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/components/MainPage/Carousel/Carousel.css";
import { Navigation, Pagination, A11y } from "swiper/modules";
import PostCardShort from "@/components/Common/Card/PostCard/PostCardShort";
import { PostWithUser } from "@/types/posts/Post.type";

interface CarouselProps {
  posts: PostWithUser[];
}

const Carousel: React.FC<CarouselProps> = ({ posts }) => {
  return (
    <div className="relative z-0">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={12}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
        style={{ height: "17rem" }}
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
        {posts.map((post, index) => (
          <SwiperSlide key={`${post.post_id}_${index}`} className="flex justify-center items-center">
            <PostCardShort post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
