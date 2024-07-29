"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useModal } from "@/provider/ContextProvider";
import LoginForm from "@/components/Login/LoginForm";

const supabase = createClient();

const Header: React.FC = () => {
  const { user, setUser, resetUser } = useAuthStore();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 마이페이지 모달 열림/닫힘 상태
  const { openModal } = useModal();

  // 로그아웃
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      resetUser();
      setIsModalOpen(false);
      router.push("/");
    } else {
      console.error("Error logout:", error);
    }
  };

  // 검색창 토글
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // 마이페이지 모달 토글
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenModal = () => {
    openModal(<LoginForm />);
  };

  // 사용자 정보를 가져옴
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };
    getUser();
  }, [setUser]);

  return (
    <header className="bg-background shadow-md relative">
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s flex justify-between items-center py-3 s:py-2">
        <Link href="/">
          <h1 className="text-lg font-bold">@gather_here</h1>
        </Link>
        <nav className="flex items-center gap-2">
          {/* 검색창 (데스크탑, 테블릿) */}
          <form className="relative s:hidden items-center overflow-hidden">
            <label htmlFor="search" className="sr-only">
              검색창
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="검색어를 입력해 주세요."
              className="shared-input-gray rounded-lg"
            />
            <button className="absolute top-[10px] right-[8px]" type="submit">
              <Image src="/Common/Icons/search.png" alt="검색 아이콘" width={24} height={24} />
            </button>
          </form>
          <div className="flex items-center s:space-x-2">
            <button
              onClick={toggleSearch}
              className="hidden s:flex items-center justify-center w-[42px] h-[42px] rounded-lg bg-fillLight hover:bg-fillLight text-white"
            >
              <Image src="/Common/Icons/search.png" alt="검색 아이콘" width={24} height={24} />
            </button>
            <Link href="/post" passHref>
              <button className="hidden s:flex items-center justify-center w-[42px] h-[42px] rounded-lg bg-fillLight hover:bg-fillLight text-white">
                <Image src="/Common/Icons/write.png" alt="글작성 버튼 아이콘" width={21} height={21} />
              </button>
            </Link>
            {user ? (
              <div className="flex items-center">
                {/* 마이페이지 버튼 (모바일) */}
                <button
                  onClick={toggleModal}
                  className="hidden s:flex items-center justify-center w-[42px] h-[42px] rounded-lg bg-fillLight hover:bg-fillLight text-white"
                >
                  <Image src="/Common/Icons/user.png" alt="유저 버튼 아이콘" width={24} height={24} />
                </button>
                {/* 마이페이지 버튼 (데스크탑, 테블릿) */}
                <Link
                  href="/mypage"
                  className="flex s:hidden items-center justify-center w-[42px] h-[42px] rounded-lg bg-fillLight hover:bg-fillLight text-white"
                >
                  <Image src="/Common/Icons/user.png" alt="유저 버튼 아이콘" width={24} height={24} />
                </Link>
                <button
                  onClick={signOut}
                  className="flex s:hidden items-center justify-center shared-button-gray-small ml-2"
                  style={{ minWidth: "80px" }}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center shared-button-gray-small"
                style={{ minWidth: "70px" }}
              >
                로그인
              </Link>
            )}
          </div>
        </nav>
      </div>
      {/* 검색창 (모바일) */}
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full bg-background z-50 p-2 flex items-center">
          <label htmlFor="search" className="sr-only">
            검색창
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="검색어를 입력해 주세요."
            className="shared-input-gray w-full"
          />
          <button type="button" onClick={toggleSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Image src="/Common/Icons/close.png" alt="닫기 버튼" width={21} height={21} />
          </button>
        </div>
      )}
      {isModalOpen && user && (
        <div className="absolute top-12 right-0 w-full max-w-[250px] bg-white shadow-lg rounded-lg p-4 z-50 s:block hidden">
          {/* 마이페이지 모달 (모바일) : 사용자 정보 표시 작업 예정 */}
          <div className="flex items-center mb-4 pb-4 border-b-[1px]">
            <div className="p-2 bg-slate-100 rounded-full flex items-center justify-center">
              <Image src="/Common/Icons/user.png" alt="User Icon" width={28} height={28} />
            </div>
            <div className="ml-4">
              <p className="text-fillStrong text-baseS">{user.email}</p>
              <p className="text-baseXs text-fillNeutral">프론트엔드 4년</p>
            </div>
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="/mypage" className="block text-fillNormal hover:text-black">
                프로필 수정
              </Link>
            </li>
            <li>
              <Link href="/mypage/myinterests" className="block text-fillNormal hover:text-black">
                내 관심글
              </Link>
            </li>
            <li>
              <Link href="/mypage/myposts" className="block text-fillNormal hover:text-black">
                내 작성글
              </Link>
            </li>
            <li>
              <button onClick={signOut} className="block w-full text-left text-fillNormal hover:text-black">
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
