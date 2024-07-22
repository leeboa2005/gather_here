"use client";

import Home from "@/components/MainPage/HomePage/Home";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  const All = dynamic(() => import("@/app/(root)/(mainPage)/all/page"));
  const Studies = dynamic(() => import("@/app/(root)/(mainPage)/studies/page"));
  const Projects = dynamic(() => import("@/app/(root)/(mainPage)/projects/page"));
  const Events = dynamic(() => import("@/app/(root)/(mainPage)/events/page"));

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <All />;
      case "studies":
        return <Studies />;
      case "projects":
        return <Projects />;
      case "events":
        return <Events />;
      default:
        return <All />;
    }
  };

  return (
    <div>
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
      <main>
        {activeTab === "all" && <Home />}
        {renderContent()}
      </main>
    </div>
  );
};

export default MainPage;
