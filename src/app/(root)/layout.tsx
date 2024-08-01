import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import CombinedProviders from "@/provider/CombinedProviders";
import Header from "@/components/Common/Header/Header";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "@gather_here",
  description: "스터디나 사이드 프로젝트 팀원을 오픈 채팅으로 빠르고 쉽게 찾을 수 있는 gather_here.",
  keywords: ["개발", "스터디", "사이드", "프로젝트", "디자인", "기획", "취업"],
  authors: [
    { name: "김영범" },
    { name: "조은영" },
    { name: "전정현" },
    { name: "이하름" },
    { name: "김성준" },
    { name: "이보아" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-main bg-background text-fontWhite">
        <CombinedProviders>
          <Header />
          {children}
        </CombinedProviders>
      </body>
    </html>
  );
}
