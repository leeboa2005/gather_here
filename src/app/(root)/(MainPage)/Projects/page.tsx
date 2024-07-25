import React from "react";
import { fetchPosts } from "@/lib/fetchPosts";
import ProjectContent from "@/components/MainPage/PageContent/ProjectContent";
import PostCardLong from "@/components/MainPage/PostCard/PostCardLong";

const ProjectsPage = async () => {
  const posts = await fetchPosts();

  if (!posts || posts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }
  const today = new Date();
  const sevenDaysPosts = new Date(today);
  sevenDaysPosts.setDate(today.getDate() + 200); // 7로바꾸면 D-7게시글만

  const projectPosts = posts.filter(
    (post) => post.category === "프로젝트" && new Date(post.deadline) <= sevenDaysPosts,
  );

  return (
    <>
      <ProjectContent posts={projectPosts} />
      {projectPosts.map((post) => (
        <PostCardLong key={post.post_id} post={post} />
      ))}
    </>
  );
};

export default ProjectsPage;
