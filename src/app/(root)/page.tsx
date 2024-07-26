import Calender from "@/components/MainPage/MainSideBar/Calender/Calender";
import React from "react";
import MainPage from "./(mainpage)/page";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-24">
      <div className="flex w-full max-w-container-l md:max-w-container-m sm:max-w-container-s space-x-4">
        <div className="w-full">
          <MainPage />
        </div>
        <div className="w-auto">
          <Calender />
        </div>
      </div>
    </main>
  );
}
