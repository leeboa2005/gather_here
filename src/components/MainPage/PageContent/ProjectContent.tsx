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
          <div className="flex items-center">
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
              <h4 className="flex items-center ml-2 mb-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.8696 15.5104L9.3032 14.7776C9.6392 14.2096 9.8072 13.9248 10.0776 13.768C10.348 13.6104 10.688 13.6048 11.368 13.5928C12.3728 13.576 13.0024 13.5144 13.5304 13.2952C14.0157 13.0942 14.4567 12.7995 14.8281 12.4281C15.1995 12.0567 15.4942 11.6157 15.6952 11.1304C16 10.396 16 9.464 16 7.6V6.8C16 4.1816 16 2.872 15.4104 1.9104C15.0808 1.37216 14.6284 0.919559 14.0904 0.5896C13.128 0 11.8184 0 9.2 0H6.8C4.1816 0 2.872 0 1.9104 0.5896C1.37216 0.919233 0.919559 1.37156 0.5896 1.9096C0 2.872 0 4.1824 0 6.8V7.6C0 9.464 9.53674e-08 10.396 0.304 11.1304C0.505111 11.6158 0.799874 12.0568 1.17145 12.4282C1.54303 12.7997 1.98415 13.0943 2.4696 13.2952C2.9976 13.5144 3.6272 13.5752 4.632 13.5928C5.312 13.6048 5.652 13.6104 5.9224 13.768C6.192 13.9248 6.3608 14.2088 6.6968 14.7776L7.1304 15.5104C7.5168 16.1632 8.4824 16.1632 8.8696 15.5104ZM11.2 8C11.4122 8 11.6157 7.91571 11.7657 7.76569C11.9157 7.61566 12 7.41217 12 7.2C12 6.98783 11.9157 6.78434 11.7657 6.63432C11.6157 6.48429 11.4122 6.4 11.2 6.4C10.9878 6.4 10.7843 6.48429 10.6343 6.63432C10.4843 6.78434 10.4 6.98783 10.4 7.2C10.4 7.41217 10.4843 7.61566 10.6343 7.76569C10.7843 7.91571 10.9878 8 11.2 8ZM8.8 7.2C8.8 7.41217 8.71571 7.61566 8.56569 7.76569C8.41566 7.91571 8.21217 8 8 8C7.78783 8 7.58434 7.91571 7.43431 7.76569C7.28429 7.61566 7.2 7.41217 7.2 7.2C7.2 6.98783 7.28429 6.78434 7.43431 6.63432C7.58434 6.48429 7.78783 6.4 8 6.4C8.21217 6.4 8.41566 6.48429 8.56569 6.63432C8.71571 6.78434 8.8 6.98783 8.8 7.2ZM4.8 8C5.01217 8 5.21566 7.91571 5.36569 7.76569C5.51571 7.61566 5.6 7.41217 5.6 7.2C5.6 6.98783 5.51571 6.78434 5.36569 6.63432C5.21566 6.48429 5.01217 6.4 4.8 6.4C4.58783 6.4 4.38434 6.48429 4.23431 6.63432C4.08429 6.78434 4 6.98783 4 7.2C4 7.41217 4.08429 7.61566 4.23431 7.76569C4.38434 7.91571 4.58783 8 4.8 8Z"
                    fill="#C3E88D"
                  />
                </svg>
                실시간 채팅에 참여해보세요.
              </h4>
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
