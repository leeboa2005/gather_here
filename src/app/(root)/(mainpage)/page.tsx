import React from "react";
import NavTabs from "@/components/MainPage/NavTab/NavTabs";
import AllPage from "./all/page";

const MainPage = async () => {
  return (
    <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s">
      <NavTabs />
      <AllPage />
    </div>
  );
};

export default MainPage;
