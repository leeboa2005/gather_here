"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AdCard from "@/components/MainPage/AdCard/AdCard";
import loadingSpinner from "../../../assets/loadingSpinner.json";
import LottiAnimation from "@/components/Common/Loading/LottiAnimation";
import ItEventCardLong from "../../Common/Card/PostCard/ItEventCardLong";
import { Tables } from "@/types/supabase";
import useScrollRestoration, { saveScrollPosition } from "@/hooks/useScrollRestoration";

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
  useScrollRestoration(); // 스크롤 위치 복원 훅 적용

  const handlePostClick = (eventId: string | number) => { // eventId 타입을 string | number로 설정
    saveScrollPosition(); // 스크롤 위치 저장
    // 여기에 게시물 클릭 시 실행할 추가 로직을 넣을 수 있습니다.
    // 예: 상세 페이지로 이동
    console.log(`Event ${eventId} clicked.`);
  };

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
          <div onClick={() => handlePostClick(post.event_id)}>
            <ItEventCardLong post={post} />
          </div>
          {(index + 1) % 5 === 0 && <AdCard key={`ad_${index}`} />}
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default EventsInfiniteScrollComponent;