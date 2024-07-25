import React from "react";
import { fetchDeadlinePosts } from "@/lib/fetchDeadlinePosts";
import StudiesContent from "@/components/MainPage/PageContent/StudiesContent";

const StudiesPage = async () => {
  const posts = await fetchDeadlinePosts(0, "스터디", 50); // 7로 바꾸면 D-7 게시글만

  if (!posts || posts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return <StudiesContent initialPosts={posts} />;
};

export default StudiesPage;
