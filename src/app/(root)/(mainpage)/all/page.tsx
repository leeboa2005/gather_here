import React, { Suspense } from "react";
import { fetchPosts } from "@/lib/fetchPosts";
import { PostWithUser } from "@/types/posts/Post.type";
import AllContent from "@/components/MainPage/PageContent/AllContent";

const AllPage = async () => {
  const initialPosts: PostWithUser[] = await fetchPosts(1);

  if (!initialPosts || initialPosts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return (
    <Suspense>
      <AllContent initialPosts={initialPosts} />
    </Suspense>
  );
};

export default AllPage;
