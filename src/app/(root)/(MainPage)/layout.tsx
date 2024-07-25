import NavTabs from "@/components/MainPage/NavTab/NavTabs";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s">
      <NavTabs />
      <main>{children}</main>
    </div>
  );
}
