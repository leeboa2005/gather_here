"use client";
import React, { useEffect, useState } from "react";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";
import { PostWithUser } from "@/types/posts/Post.type";
import { fetchPosts, fetchPostsWithDeadLine } from "@/lib/fetchPosts";
import FilterBar from "../FilterBar/FilterBar";
import Calender from "../MainSideBar/Calender/Calender";
import CommonModal from "@/components/Common/Modal/CommonModal";
import Image from "next/image";
import run from "@/../public/Main/run.png";
import CarouselLoader from "@/components/Common/Skeleton/CarouselLoader";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("@/components/MainPage/Carousel/Carousel"), { ssr: false });

interface ProjectContentProps {
  initialPosts: PostWithUser[];
}

const ProjectContent: React.FC<ProjectContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<PostWithUser[]>(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [carouselPosts, setCarouselPosts] = useState<PostWithUser[]>([]);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  useEffect(() => {
    const loadCarouselData = async () => {
      setIsLoadingCarousel(true);
      const carouselData = await fetchPostsWithDeadLine(15, "프로젝트"); // D-일수이내
      setCarouselPosts(carouselData);
      setIsLoadingCarousel(false);
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
    const loadInitialPosts = async () => {
      setPage(1);
      setPosts([]);
      setHasMore(true);
      await loadMorePosts(true);
    };
    loadInitialPosts();
  }, [selectedPosition, selectedPlace, selectedLocation, selectedDuration]);

  const loadMorePosts = async (isInitialLoad = false) => {
    const currentPage = isInitialLoad ? 1 : page;
    console.log(`Loading page: ${currentPage}`);
    const newPosts: PostWithUser[] = await fetchPosts(currentPage, "프로젝트", {
      targetPosition: selectedPosition ? [selectedPosition] : undefined,
      place: selectedPlace,
      location: selectedLocation,
      duration: selectedDuration,
    });

    console.log("Fetched posts:", newPosts);

    if (!newPosts || newPosts.length === 0) {
      setHasMore(false);
      return;
    }

    setPosts((prevPosts) => {
      const postMap = new Map<string, PostWithUser>();
      prevPosts.forEach((post) => postMap.set(post.post_id, post));
      newPosts.forEach((post) => postMap.set(post.post_id, post));

      const uniquePosts = Array.from(postMap.values());
      console.log("Updated posts:", uniquePosts);
      return uniquePosts;
    });

    if (!isInitialLoad) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        console.log(`Updated page: ${newPage}`);
        return newPage;
      });
    }
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
          <div className="flex items-center mb-3">
            <Image src={run} alt="run" width={17} />
            <h1 className="text-base font-base ml-2">모집이 곧 종료돼요</h1>
          </div>
          {isLoadingCarousel ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {Array.from({ length: isMobile ? 1 : 3 }).map((_, index) => (
                <CarouselLoader key={index} />
              ))}
            </div>
          ) : (
            <Carousel posts={carouselPosts} />
          )}
          <FilterBar
            selectedPosition={selectedPosition}
            selectedPlace={selectedPlace}
            selectedLocation={selectedLocation}
            selectedDuration={selectedDuration}
            onChange={handleFilterChange}
          />
          <InfiniteScrollComponent posts={posts} hasMore={hasMore} loadMorePosts={() => loadMorePosts(false)} />
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

export default ProjectContent;
