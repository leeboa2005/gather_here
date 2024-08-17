"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCardLong from "@/components/Common/Card/PostCard/PostCardLong";
import AdCard from "@/components/MainPage/AdCard/AdCard";
import loadingSpinner from "../../../assets/loadingSpinner.json";
import { PostWithUser } from "@/types/posts/Post.type";
import LottiAnimation from "@/components/Common/Loading/LottiAnimation";
import InitialLoadingWrapper from "@/components/Common/Loading/InitialLoadingWrapper";
import useScrollRestoration from "@/hooks/useScrollRestoration";

interface InfiniteScrollComponentProps {
  posts: PostWithUser[];
  hasMore: boolean;
  loadMorePosts: () => Promise<void>;
  tabName: string;  // 탭 이름을 Prop으로 받아옵니다
}

const InfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({ posts = [], hasMore, loadMorePosts, tabName }) => {
  const postsPerPage = 5;  // 한 번에 로드되는 게시물 수
  const { saveScrollPosition, restoreScrollPosition } = useScrollRestoration(postsPerPage, tabName); // 탭 이름을 인수로 전달합니다.

  const [isNavigating, setIsNavigating] = useState(false); // 중복 클릭 방지 상태

  // 탭이 변경될 때 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(`탭 변경됨: ${tabName}, 스크롤 위치 초기화`);
  }, [tabName]);

  useEffect(() => {
    restoreScrollPosition(loadMorePosts); // 컴포넌트가 마운트될 때 스크롤 위치 복원 시도
  }, [posts]);

  const handlePostClick = (postId: string | number, index: number) => {
    if (isNavigating) return; // 중복 클릭 방지
    saveScrollPosition(postId, index); // 스크롤 위치 저장
    console.log(`Post ${postId} clicked.`);

    setTimeout(() => {
      setIsNavigating(false); // 상태 초기화
    }, 500); // 페이지 이동 후 상태 초기화 시점 조정
  };

  return (
    <InitialLoadingWrapper>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "white" }}>해당 조건에 맞는 게시물이 없습니다.</p>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center w-full">
              <LottiAnimation animationData={loadingSpinner} size="50px" />
            </div>
          }
          endMessage={<p style={{ textAlign: "center", color: "white" }}>모든 포스트를 불러왔습니다.</p>}
        >
          {posts.map((post, index) => (
            <React.Fragment key={`${post.post_id}_${index}`}>
              <div onClick={() => handlePostClick(post.post_id, index)}>
                <PostCardLong post={post} />
              </div>
              {(index + 1) % 5 === 0 && <AdCard key={`ad_${index}`} />}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      )}
    </InitialLoadingWrapper>
  );
};

export default InfiniteScrollComponent;