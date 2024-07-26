import Calender from "@/components/MainPage/MainSideBar/Calender/Calender";
import React from "react";
import MainPage from "./(mainpage)/page";

export default function Home() {
  return (
    <main className="w-full flex justify-center">
      <div className="w-full max-w-container-l m:max-w-container-m s:max-w-container-s px-4 flex space-x-4 mt-6">
        <div className="w-2/3">
          <MainPage />
        </div>
        <div className="w-1/3">
          <Calender />
        </div>
      </div>
    </main>
  );
}
