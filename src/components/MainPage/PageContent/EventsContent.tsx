"use client";
import Image from "next/image";
import CarouselLoader from "@/components/Common/Skeleton/CarouselLoader";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import { Tables } from "@/types/supabase";
import { fetchEventsPosts, fetchEventsPostsWithDeadLine, FetchPostsFilters } from "@/lib/fetchPosts";
import EventsInfiniteScrollComponent from "../InfiniteScroll/EventsInfiniteScroll";
import MainLayout from "@/components/Layout/MainLayout";
import Calender from "../MainSideBar/Calender/Calender";

const Carousel = dynamic(() => import("@/components/MainPage/Carousel/EventsCarousel"), { ssr: false });

const EventsContent: NextPage = () => {
  const [posts, setPosts] = useState<Tables<"IT_Events">[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [carouselPosts, setCarouselPosts] = useState<Tables<"IT_Events">[]>([]);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [days, setDays] = useState<number>(30); // D-일수이내

  useEffect(() => {
    const loadCarouselData = async () => {
      setIsLoadingCarousel(true);
      const carouselData = await fetchEventsPostsWithDeadLine(days);
      setCarouselPosts(carouselData);
      setIsLoadingCarousel(false);
    };
    loadCarouselData();
  }, [days]);

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

    const newPosts = await fetchEventsPosts(page);

    setPosts((prevPosts) => {
      const uniqueNewPosts = newPosts.filter(
        (newPost) => !prevPosts.some((post) => post.event_id === newPost.event_id),
      );
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
        const allPosts = await fetchEventsPosts(1);
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

        const filteredPosts = await fetchEventsPosts(1);

        setPosts(filteredPosts);
        setPage(2);
        setHasMore(filteredPosts.length === 5);
      }
    },
    [],
  );

  useEffect(() => {
    const initialLoad = async () => {
      const initialPosts = await fetchEventsPosts(1);
      setPosts(initialPosts);
      setPage(2);
      setHasMore(initialPosts.length === 5);
    };

    initialLoad();
  }, []);

  return (
    <>
      <div className="hidden m:block">
        <Calender />
      </div>
      <div className="w-full mb-4">
        <div className="flex items-center">
          <Image src="/assets/run.svg" alt="Run Icon" width={20} height={20} className="w-5 h-5" priority />
          <p className="m-2 text-labelNormal">모집이 곧 종료돼요</p>
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
        {/* <FilterBar
            selectedPosition={selectedPosition}
            selectedPlace={selectedPlace}
            selectedLocation={selectedLocation}
            selectedDuration={selectedDuration}
            onChange={handleFilterChange}
          /> */}
        <div className="flex items-center mt-7 mb-4">
          <Image src="/assets/puzzle.svg" alt="Puzzle Icon" width={20} height={20} />
          <p className="ml-2 text-labelNormal">나에게 꼭 맞는 동료들을 찾아보세요</p>
        </div>
        <EventsInfiniteScrollComponent posts={posts} hasMore={hasMore} loadMorePosts={loadMorePosts} />
      </div>
    </>
  );
};

export default EventsContent;
