import Calender from "@/components/MainPage/MainSideBar/Calender/Calender";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-96">
        <Calender />
      </div>
    </main>
  );
}
