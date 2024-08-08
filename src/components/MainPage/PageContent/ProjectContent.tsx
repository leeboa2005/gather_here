"use client";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";
import { PostWithUser } from "@/types/posts/Post.type";
import { fetchPosts, fetchPostsWithDeadLine, FetchPostsFilters } from "@/lib/fetchPosts";
import FilterBar from "../FilterBar/FilterBar";
import Image from "next/image";
import CarouselLoader from "@/components/Common/Skeleton/CarouselLoader";
import dynamic from "next/dynamic";
import MainLayout from "@/components/Layout/MainLayout";

const Carousel = dynamic(() => import("@/components/MainPage/Carousel/Carousel"), { ssr: false });

interface ProjectContentProps {
  initialPosts: PostWithUser[];
}

const ProjectContent: React.FC<ProjectContentProps> = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [carouselPosts, setCarouselPosts] = useState<PostWithUser[]>([]);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
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

    const newPosts = await fetchPosts(page, "프로젝트", filterOptions);

    setPosts((prevPosts) => {
      const uniqueNewPosts = newPosts.filter((newPost) => !prevPosts.some((post) => post.post_id === newPost.post_id));
      return [...prevPosts, ...uniqueNewPosts];
    });

    setPage((prevPage) => prevPage + 1);

    if (newPosts.length < 5) {
      setHasMore(false);
    }
  };

  const handleFilterChange = useCallback(
    async (position: string, place: string, location: string, duration: number | null) => {
      setSelectedPosition(position);
      setSelectedPlace(place);
      setSelectedLocation(location);
      setSelectedDuration(duration);

      const isDefaultFilter = !position && !place && !location && duration === null;

      if (isDefaultFilter) {
        const allPosts = await fetchPosts(1, "프로젝트", {});
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

        const filteredPosts = await fetchPosts(1, "프로젝트", filterOptions);

        setPosts(filteredPosts);
        setPage(2);
        setHasMore(filteredPosts.length === 5);
      }
    },
    [],
  );

  useEffect(() => {
    const initialLoad = async () => {
      const initialPosts = await fetchPosts(1, "프로젝트", {});
      setPosts(initialPosts);
      setPage(2);
      setHasMore(initialPosts.length === 5);
    };

    initialLoad();
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <div className="flex items-center">
          <Image src="/assets/run.svg" alt="Run Icon" width={20} height={20} className="w-5 h-5" priority />
          <p className="m-2 text-labelNormal">모집이 곧 종료돼요</p>
        </div>
        {isLoadingCarousel ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselLoader key={index} />
            ))}
          </div>
        ) : (
          <Carousel posts={carouselPosts} />
        )}
        <div className="flex items-center mt-7">
          <Image src="/assets/puzzle.svg" alt="Puzzle Icon" width={20} height={20} />
          <p className="ml-2 text-labelNormal">나에게 꼭 맞는 동료들을 찾아보세요</p>
        </div>
        <FilterBar
          selectedPosition={selectedPosition}
          selectedPlace={selectedPlace}
          selectedLocation={selectedLocation}
          selectedDuration={selectedDuration}
          onChange={handleFilterChange}
        />
        <InfiniteScrollComponent posts={posts} hasMore={hasMore} loadMorePosts={loadMorePosts} />
      </div>
    </MainLayout>
  );
};

export default ProjectContent;
