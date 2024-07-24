import Carousel from "@/components/MainPage/Carousel/Carousel";
import PostCardLong from "@/components/MainPage/PostCard/PostCardLong";
import { Post } from "@/types/posts/Post.type";
import React from "react";

interface StudyPageProps {
  posts: Post[];
}

const ProjectPage: React.FC<StudyPageProps> = ({ posts }) => {
  const today = new Date();
  const sevenDaysPosts = new Date(today);
  sevenDaysPosts.setDate(today.getDate() + 200); // 7로바꾸면 D-7게시글만
  const studyPosts = (posts || []).filter(
    (post) => post.category === "프로젝트" && new Date(post.deadline) <= sevenDaysPosts,
  );
  return (
    <>
      <div>
        <h1 className="font-bold text-lg">마감 임박</h1>
        <Carousel posts={studyPosts} />
        {studyPosts.map((post) => (
          <PostCardLong key={post.post_id} post={post} />
        ))}
      </div>
    </>
  );
};

export default ProjectPage;
