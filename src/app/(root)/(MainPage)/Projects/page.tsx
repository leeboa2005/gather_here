import React from "react";
import { fetchDeadlinePosts } from "@/lib/fetchDeadlinePosts";
import ProjectContent from "@/components/MainPage/PageContent/ProjectContent";

const ProjectsPage = async () => {
  const initialPosts = await fetchDeadlinePosts(0, "프로젝트", 200); // 필요한 날짜 범위로 변경

  if (!initialPosts || initialPosts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return <ProjectContent initialPosts={initialPosts} />;
};

export default ProjectsPage;
