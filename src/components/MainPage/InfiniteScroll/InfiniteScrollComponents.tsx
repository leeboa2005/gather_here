"use client";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCardLong from "@/components/Common/Card/PostCard/PostCardLong";
import AdCard from "@/components/MainPage/AdCard/AdCard";
import { Post } from "@/types/posts/Post.type";

interface InfiniteScrollComponentProps {
  posts: Post[];
  hasMore: boolean;
  loadMorePosts: () => Promise<void>;
}

const InfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({ posts = [], hasMore, loadMorePosts }) => {
  return (
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
  );
};

export default InfiniteScrollComponent;
