"use client";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";
import { PostWithUser } from "@/types/posts/Post.type";
import { FetchPostsFilters, fetchPosts, fetchPostsWithDeadLine } from "@/lib/fetchPosts";
import FilterBar from "../FilterBar/FilterBar";
import Calender from "../MainSideBar/Calender/Calender";
import CommonModal from "@/components/Common/Modal/CommonModal";
import Image from "next/image";
import run from "@/../public/Main/run.png";
import CarouselLoader from "@/components/Common/Skeleton/CarouselLoader";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("@/components/MainPage/Carousel/Carousel"), { ssr: false });

interface StudiesContentProps {
  initialPosts: PostWithUser[];
}

const StudiesContent: React.FC<StudiesContentProps> = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
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
      const carouselData = await fetchPostsWithDeadLine(15, "스터디"); // D-일수이내
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

  const loadMorePosts = async () => {
    const filterOptions: FetchPostsFilters = {
      targetPosition: selectedPosition ? [selectedPosition] : undefined,
      place: selectedPlace,
      location: selectedLocation,
      duration: null,
    };

    if (selectedDuration !== null) {
      if (selectedDuration === 7) {
        filterOptions.duration = { gt: 6 };
      } else {
        filterOptions.duration = { lte: selectedDuration };
      }
    }

    const newPosts = await fetchPosts(page, "스터디", filterOptions);

    setPosts((prevPosts) => {
      const uniqueNewPosts = newPosts.filter((newPost) => !prevPosts.some((post) => post.post_id === newPost.post_id));
      return [...prevPosts, ...uniqueNewPosts];
    });

    setPage((prevPage) => prevPage + 1);

    if (newPosts.length < 5) {
      setHasMore(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = useCallback(
    async (position: string, place: string, location: string, duration: number | null) => {
      setSelectedPosition(position);
      setSelectedPlace(place);
      setSelectedLocation(location);
      setSelectedDuration(duration);

      const isDefaultFilter = !position && !place && !location && duration === null;

      if (isDefaultFilter) {
        const allPosts = await fetchPosts(1, "스터디", {});
        setPosts(allPosts);
        setPage(2);
        setHasMore(allPosts.length === 5);
      } else {
        const filterOptions: FetchPostsFilters = {
          targetPosition: position ? [position] : undefined,
          place: place,
          location: location,
          duration: null,
        };

        if (duration !== null) {
          if (duration === 7) {
            filterOptions.duration = { gt: 6 };
          } else {
            filterOptions.duration = { lte: duration };
          }
        }

        const filteredPosts = await fetchPosts(1, "스터디", filterOptions);

        setPosts(filteredPosts);
        setPage(2);
        setHasMore(filteredPosts.length === 5);
      }
    },
    [],
  );

  useEffect(() => {
    const initialLoad = async () => {
      const initialPosts = await fetchPosts(1, "스터디", {});
      setPosts(initialPosts);
      setPage(2);
      setHasMore(initialPosts.length === 5);
    };

    initialLoad();
  }, []);

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
          <InfiniteScrollComponent posts={posts} hasMore={hasMore} loadMorePosts={loadMorePosts} />
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
