"use client";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCardLong from "@/components/Common/Card/PostCard/PostCardLong";
import AdCard from "@/components/MainPage/AdCard/AdCard";
import LottiAnimation from "@/components/Common/Loading/LottiAnimation";
import { Post } from "@/types/posts/Post.type";

interface InfiniteScrollComponentProps {
  posts: Post[];
  hasMore: boolean;
  loadMorePosts: () => Promise<void>;
}

const InfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({ posts = [], hasMore, loadMorePosts }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadMorePosts();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setInitialLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {initialLoading ? (
        <LottiAnimation size="200px" isFixed={true} /> // 초기 로딩 애니메이션
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={async () => {
            setLoading(true);
            await loadMorePosts();
            setLoading(false);
          }}
          hasMore={hasMore}
          loader={<div className="loader-container"><LottiAnimation size="50px" /></div>} // 무한 스크롤 로딩 애니메이션
          endMessage={<p style={{ textAlign: "center" }}>모든 포스트를 불러왔습니다.</p>}
        >
          {posts.map((post, index) => (
            <React.Fragment key={`${post.post_id}_${index}`}>
              <PostCardLong post={post} />
              {(index + 1) % 5 === 0 && <AdCard key={`ad_${index}`} />}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      )}
      {loading && <div className="loader-container"><LottiAnimation size="50px" /></div>} {/* 추가 로딩 애니메이션 */}
    </div>
  );
};

export default InfiniteScrollComponent;