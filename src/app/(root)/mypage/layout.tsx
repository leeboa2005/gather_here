// /app/(root)/mypage/layout.tsx
import React from "react";
import MyPageNav from "@/components/MyPage/LeftNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/provider/UserContextProvider";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <div className="flex flex-col md:flex-row w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s gap-4 mt-8 mb-8">
        <MyPageNav />
        <main className="flex-1 h-screen">
          <ToastContainer />
          {children}
        </main>
      </div>
    </UserProvider>
  );
};

export default MyPageLayout;
