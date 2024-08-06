"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import AdCard from "@/components/MainPage/AdCard/AdCard";
import loadingBar from "../../../assets/loadingBar.json";
import loadingSpinner from "../../../assets/loadingSpinner.json";
import LottiAnimation from "@/components/Common/Loading/LottiAnimation";
import ItEventCardLong from "../PageContent/ItEvent/Card/ItEventCardLong";
import { Tables } from "@/types/supabase";

interface InfiniteScrollComponentProps {
  posts: Tables<"IT_Events">[];
  hasMore: boolean;
  loadMorePosts: () => Promise<void>;
}

const EventsInfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({
  posts = [],
  hasMore,
  loadMorePosts,
}) => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // Simulating a loading time, adjust as needed
  }, []);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <LottiAnimation animationData={loadingBar} size="200px" />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center items-center w-full" style={{ marginTop: "20px" }}>
          <LottiAnimation animationData={loadingSpinner} size="50px" />
        </div>
      }
      endMessage={<p style={{ textAlign: "center", color: "white" }}>모든 포스트를 불러왔습니다.</p>}
    >
      {posts.map((post, index) => (
        <React.Fragment key={`${post.event_id}_${index}`}>
          <ItEventCardLong post={post} />
          {(index + 1) % 5 === 0 && <AdCard key={`ad_${index}`} />}
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default EventsInfiniteScrollComponent;
