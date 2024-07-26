"use client";
import PostCardLong from "@/components/Common/Card/PostCard/PostCardLong";
import AdCard from "../AdCard/AdCard";
import { fetchPosts } from "@/lib/fetchPosts";
import { Post } from "@/types/posts/Post.type";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollComponentProps {
  initialPosts: Post[];
}

const InfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // 초기 페이지는 이미 불러왔으므로 1로 시작

  const loadMorePosts = async () => {
    const newPosts: Post[] = await fetchPosts(page);

    if (!newPosts || newPosts.length === 0) {
      setHasMore(false);
      return;
    }

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

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
