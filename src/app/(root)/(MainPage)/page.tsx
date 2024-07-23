"use client";

import useFetchPosts from "@/hooks/useFetchPosts";
import { Post } from "@/types/posts/Post.type";
import { UseQueryResult } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const All = dynamic(() => import("@/app/(root)/(mainpage)/all/page"));
const Studies = dynamic(() => import("@/app/(root)/(mainpage)/studies/page"));
const Projects = dynamic(() => import("@/app/(root)/(mainpage)/projects/page"));
const Events = dynamic(() => import("@/app/(root)/(mainpage)/events/page"));

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { data: posts, isLoading, error }: UseQueryResult<Post[], Error> = useFetchPosts();

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <All />;
      case "studies":
        return <Studies posts={posts || []} />;
      case "projects":
        return <Projects posts={posts || []} />;
      case "events":
        return <Events />;
      default:
        return <All />;
    }
  };

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s">
      <nav className="p-5">
        <button className="mr-3" onClick={() => setActiveTab("all")}>
          전체
        </button>
        <button className="mr-3" onClick={() => setActiveTab("studies")}>
          스터디
        </button>
        <button className="mr-3" onClick={() => setActiveTab("projects")}>
          프로젝트
        </button>
        <button className="mr-3" onClick={() => setActiveTab("events")}>
          IT행사
        </button>
      </nav>
      <main>{renderContent()}</main>
    </div>
  );
};

export default MainPage;
