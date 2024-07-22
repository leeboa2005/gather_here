import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, A11y } from "swiper/modules";
import PostCard from "@/components/MainPage/PostCard/PostCardShort";
import { Post } from "@/types/posts/Post.type";

interface CarouselProps {
  posts: Post[];
}

const Carousel: React.FC<CarouselProps> = ({ posts }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      //   spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-full m-3"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.post_id} className="flex justify-center items-center">
          <PostCard post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
