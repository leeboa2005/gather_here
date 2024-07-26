import React from "react";
import { fetchPosts } from "@/lib/fetchPosts";
import { Post } from "@/types/posts/Post.type";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";

const AllPage = async () => {
  const initialPosts: Post[] = await fetchPosts(0);

  if (!initialPosts || initialPosts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return <InfiniteScrollComponent initialPosts={initialPosts} />;
};

export default AllPage;
