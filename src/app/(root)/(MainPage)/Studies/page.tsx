import React from "react";
import { fetchPosts } from "@/lib/fetchPosts";
import StudiesContent from "@/components/MainPage/PageContent/StudiesContent";
import PostCardLong from "@/components/MainPage/PostCard/PostCardLong";

const StudiesPage = async () => {
  const posts = await fetchPosts();

  if (!posts || posts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  const today = new Date();
  const sevenDaysPosts = new Date(today);
  sevenDaysPosts.setDate(today.getDate() + 50); // 7로바꾸면 D-7게시글만

  const studyPosts = posts.filter((post) => post.category === "스터디" && new Date(post.deadline) <= sevenDaysPosts);

  return (
    <>
      <StudiesContent posts={studyPosts} />
      {studyPosts.map((post) => (
        <PostCardLong key={post.post_id} post={post} />
      ))}
    </>
  );
};

export default StudiesPage;
