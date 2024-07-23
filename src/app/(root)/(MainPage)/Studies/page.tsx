import Carousel from "@/components/MainPage/Carousel/Carousel";
import React from "react";
import { Post } from "@/types/posts/Post.type";

interface StudyPageProps {
  posts: Post[];
}

const StudyPage: React.FC<StudyPageProps> = ({ posts }) => {
  const today = new Date();
  const sevenDaysPosts = new Date(today);
  sevenDaysPosts.setDate(today.getDate() + 50); // 7로바꾸면 D-7게시글만

  const studyPosts = (posts || []).filter(
    (post) => post.category === "스터디" && new Date(post.deadline) <= sevenDaysPosts,
  );

  return (
    <div>
      <h1 className="font-bold text-lg">마감 임박</h1>
      <Carousel posts={studyPosts} />
    </div>
  );
};

export default StudyPage;
