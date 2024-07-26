import React from "react";
import { fetchDeadlinePosts } from "@/lib/fetchDeadlinePosts";
import ProjectContent from "@/components/MainPage/PageContent/ProjectContent";

const ProjectsPage = async () => {
  const posts = await fetchDeadlinePosts(1, "프로젝트", 200); // 7로 바꾸면 D-7 게시글만
  console.log("posts", posts.length);
  if (!posts || posts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return <ProjectContent initialPosts={posts} />;
};

export default ProjectsPage;
