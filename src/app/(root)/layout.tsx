import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Provider from "@/provider/Provider";
import ContextProvider from "@/provider/ContextProvider";
import Header from "@/components/Common/Header/Header";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

// 로고 제작되면 추후에 og img, 파비콘 추가 예정
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
  // loginModal,
}: {
  children: React.ReactNode;
  // loginModal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <Link href="/login">로그인 모달열기</Link>
        {/* <ContextProvider>
          <Provider>{children} {loginModal} </Provider>
        </ContextProvider> */}
      </body>
    </html>
  );
}
