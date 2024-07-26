"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

const Header: React.FC = () => {
  const { user, setUser, resetUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };
    getUser();
  }, [setUser]);

  console.log(user);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log("logout successful");
      resetUser();
      router.push("/");
    } else {
      console.error("Error logout:", error);
    }
  };

  return (
    <header className="bg-[#1A1B1E] shadow-md">
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s flex justify-between items-center pt-4 pb-4 text-white">
        <Link href="/">
          <h1 className="text-lg font-bold">@gather_here</h1>
        </Link>
        <nav className="flex items-center space-x-4">
          <form className="flex s:hidden items-center border rounded border-white overflow-hidden">
            <label htmlFor="search" className="sr-only">
              검색창
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="검색어를 입력해 주세요."
              className="px-2 py-1 bg-[#1A1B1E] text-white outline-none"
            />
            <button type="submit" className="px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17.65 10.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
          {user ? (
            <div className="flex items-center space-x-2">
              <Link href="/mypage">프로필</Link>
              <button onClick={signOut} className="text-white">
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

// 1. user : null
// 2. user : user있음
// 3. user : null
// 4. user : user있음