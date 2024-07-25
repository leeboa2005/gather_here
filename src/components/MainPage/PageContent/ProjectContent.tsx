"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Post } from "@/types/posts/Post.type";

const Carousel = dynamic(() => import("@/components/MainPage/Carousel/Carousel"), { ssr: false });

interface ProjectContentProps {
  posts: Post[];
}

const ProjectContent: React.FC<ProjectContentProps> = ({ posts }) => {
  return (
    <div>
      <h1 className="font-bold text-lg">마감 임박</h1>
      <Carousel posts={posts} />
    </div>
  );
};

export default ProjectContent;
