import React from "react";
import MyPageNav from "@/components/MyPage/Common/LeftNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s gap-4 mt-8 mb-8">
      <MyPageNav />
      <main className="flex-1 h-screen">
        <ToastContainer />
        {children}
      </main>
    </div>
  );
};

export default MyPageLayout;
