"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostWithUser } from "@/types/posts/Post.type";
import PostCardLong from "@/components/Common/Card/PostCard/PostCardLong";
import AdCard from "@/components/MainPage/AdCard/AdCard";
import { fetchPosts, fetchPostsWithDeadLine } from "@/lib/fetchPosts";
import FilterBar from "../FilterBar/FilterBar";
import Calender from "../MainSideBar/Calender/Calender";
import CommonModal from "@/components/Common/Modal/CommonModal";
import Image from "next/image";
import run from "@/../public/Main/run.png";

const Carousel = dynamic(() => import("@/components/MainPage/Carousel/Carousel"), { ssr: false });

interface StudiesContentProps {
  initialPosts: PostWithUser[];
}

const StudiesContent: React.FC<StudiesContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<PostWithUser[]>(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [carouselPosts, setCarouselPosts] = useState<PostWithUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  useEffect(() => {
    const loadCarouselData = async () => {
      const carouselData = await fetchPostsWithDeadLine(15, "스터디"); // D-일수이내
      setCarouselPosts(carouselData);
    };
    loadCarouselData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1068);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPage(1);
    setPosts([]);
    setHasMore(true);
    loadMorePosts();
  }, [selectedPosition, selectedPlace, selectedLocation, selectedDuration]);

  const loadMorePosts = async () => {
    const newPosts: PostWithUser[] = await fetchPosts(page, "스터디", {
      targetPosition: selectedPosition ? [selectedPosition] : undefined,
      place: selectedPlace,
      location: selectedLocation,
      duration: selectedDuration,
    });

    if (!newPosts || newPosts.length === 0) {
      setHasMore(false);
      return;
    }

    setPosts((prevPosts) => {
      const allPosts = [...prevPosts, ...newPosts];
      const uniquePosts = allPosts.filter(
        (post, index, self) => index === self.findIndex((p) => p.post_id === post.post_id),
      );
      return uniquePosts;
    });

    setPage((prevPage) => prevPage + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (position: string, place: string, location: string, duration: number | null) => {
    setSelectedPosition(position);
    setSelectedPlace(place);
    setSelectedLocation(location);
    setSelectedDuration(duration);
  };

  return (
    <div className="w-full max-w-container-l m:max-w-container-m s:max-w-container-s px-4 mt-6">
      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center">
            <Image src={run} alt="run" width={17} />
            <h1 className="text-base font-base ml-2">모집이 곧 종료돼요</h1>
          </div>
          <Carousel posts={carouselPosts} />
          <FilterBar
            selectedPosition={selectedPosition}
            selectedPlace={selectedPlace}
            selectedLocation={selectedLocation}
            selectedDuration={selectedDuration}
            onChange={handleFilterChange}
          />
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: "center" }}>모든 포스트를 불러왔습니다.</p>}
          >
            {posts.map((post, index) => (
              <React.Fragment key={`${post.post_id}_${index}`}>
                <PostCardLong post={post} />
                {(index + 1) % 5 === 0 && <AdCard key={`ad_${index}`} />}
              </React.Fragment>
            ))}
          </InfiniteScroll>
        </div>
        {!isMobile && (
          <div className="col-span-1">
            <div className="sticky top-4">
              <Calender />
            </div>
          </div>
        )}
      </div>
      {isMobile && (
        <button
          onClick={openModal}
          className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg z-50"
        >
          캘린더
        </button>
      )}
      <CommonModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <Calender />
      </CommonModal>
    </div>
  );
};

export default StudiesContent;
