"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginForm from "@/components/Login/LoginForm";
import { useUser } from "@/provider/UserContextProvider";
import { createClient } from "@/utils/supabase/client";
import useSignupStore from "@/store/useSignupStore";

const supabase = createClient();

const Header: React.FC = () => {
  const { user, userData, fetchUserData, initializationUser } = useUser();
  const { resetAuthUser } = useSignupStore();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMypageModalOpen, setIsMypageModalOpen] = useState(false);
  const defaultImage = "/Common/Icons/user.png";

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
      return;
    }
    // 상태 초기화 및 리디렉션
    resetAuthUser();
    initializationUser();
    router.push("/");
  };

  // 검색창 토글
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // 마이페이지 모달 토글
  const toggleMypageModal = () => {
    setIsMypageModalOpen(!isMypageModalOpen);
  };

  // 모달 열기
  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
    setIsMypageModalOpen(false);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수 추가
  const handleCloseLoginModal = () => {
    setIsModalOpen(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleClickPost = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!user) {
      evt.preventDefault();
      handleOpenLoginModal();
    }
  };

  const getProfileImageUrl = (url: string) => `${url}?${new Date().getTime()}`;

  return (
    <header className="bg-background shadow-md relative text-fontWhite">
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s flex justify-between items-center py-3 s:py-2">
        <Link href="/">
          <Image src="/logos/logo.png" alt="@gather_here 로고" priority width={151} height={24} />
        </Link>
        <nav className="flex items-center gap-2">
          {/* 검색창 데스크탑 */}
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
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSearch}
              className="hidden s:flex items-center justify-center w-[45px] h-[45px] rounded-lg bg-fillLight hover:bg-fillLight text-white"
            >
              <Image src="/Common/Icons/search.png" alt="검색 아이콘" width={24} height={24} />
            </button>
            <Link onClick={(evt) => handleClickPost(evt)} href="/post" passHref>
              <button className="flex items-center justify-center w-[45px] h-[45px] rounded-lg bg-fillLight hover:bg-fillLight text-white">
                <Image src="/Common/Icons/write.png" alt="글작성 버튼 아이콘" width={21} height={21} />
              </button>
            </Link>
            {user ? (
              <div className="flex items-center">
                <button
                  onClick={toggleMypageModal}
                  className="hidden s:flex items-center justify-center w-[45px] h-[45px] rounded-lg bg-fillLight hover:bg-fillLight text-white"
                >
                  <Image src={defaultImage} alt="마이페이지 아이콘" width={28} height={28} className="rounded-full" />
                </button>
                <Link
                  href="/mypage"
                  className="flex s:hidden items-center justify-center w-[45px] h-[45px] rounded-lg bg-fillLight hover:bg-fillLight text-white"
                >
                  <Image src={defaultImage} alt="마이페이지 아이콘" width={28} height={28} className="rounded-full" />
                </Link>
                <button onClick={signOut} className="shared-button-gray ml-2 s:hidden">
                  로그아웃
                </button>
              </div>
            ) : (
              <button onClick={handleOpenLoginModal} className="shared-button-gray">
                로그인
              </button>
            )}
          </div>
        </nav>
      </div>
      {/* 검색창 모바일 */}
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
      {isModalOpen && (
        <>
          {/* 백드롭 추가 */}
          <div className="fixed inset-0 bg-black opacity-80 z-40" onClick={handleCloseLoginModal}></div>
          {/* 모달 추가 */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-[20px] p-4 z-50">
            <button
              onClick={handleCloseLoginModal}
              className="ml-auto mt-1 mr-1 block text-right p-1 text-3xl text-[fontWhite] hover:text-[#777]"
            >
              &times;
            </button>
            <LoginForm />
          </div>
        </>
      )}
      {isMypageModalOpen && user && (
        <div className="absolute top-12 right-0 w-full max-w-[250px] bg-white shadow-lg rounded-lg p-5 z-50 s:block hidden">
          <div className="flex items-center mb-4 pb-4 border-b-[1px]">
            <div className="w-12 h-12 bg-slate-100 rounded-[12px] flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full rounded-[12px]">
                <Image
                  src={userData?.profile_image_url ? getProfileImageUrl(userData.profile_image_url) : defaultImage}
                  alt="프로필 이미지"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[12px]"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-fillStrong text-baseS font-subtitle">{userData?.nickname}</p>
              <p className="text-baseXs text-fillNeutral">
                {userData?.job_title} {userData?.experience}
              </p>
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
