"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/provider/UserContextProvider";
import Image from "next/image";
import LeftNavLoader from "@/components/Common/Skeleton/LeftNavLoader";

const LeftNav: React.FC = () => {
  const pathname = usePathname();
  const { userData, loading } = useUser();
  const defaultImage = "/Mypage/default-profile.png";

  // 캐시 방지용 URL 생성 함수
  const getProfileImageUrl = (url: string) => `${url}?${new Date().getTime()}`;

  // 직군에 따라 클래스명 매핑
  const jobTitleClassMap: { [key: string]: string } = {
    프론트엔드: "text-primary",
    IOS: "text-accentPurple",
    안드로이드: "text-accentRed",
    PM: "text-accentColumbia",
    기획자: "text-accentPink",
    마케팅: "text-accentYellow",
    백엔드: "text-accentOrange",
    디자이너: "text-accentMaya",
    데브옵스: "text-accentMint",
  };

  // 직군에 따라 클래스명을 동적으로 설정
  const getJobTitleClass = (jobTitle: string) => {
    const lowerJobTitle = jobTitle.toLowerCase();
    for (const [key, value] of Object.entries(jobTitleClassMap)) {
      if (lowerJobTitle.includes(key.toLowerCase())) {
        return value;
      }
    }
    return "";
  };

  const jobTitleClass = userData ? getJobTitleClass(userData.job_title) : "";

  return (
    <aside className="sticky top-0 p-6 s:p-0 w-[250px]  max-h-[257px] flex flex-col items-start gap-3 rounded-[20px] bg-fillStrong text-fontWhite shadow-sm s:hidden">
      {loading ? (
        <LeftNavLoader />
      ) : userData ? (
        <div className="flex items-center gap-3 mb-1 pb-5  w-full border-b-[1px] border-labelAssistive">
          <div className="w-12 h-12 rounded-[12px] bg-fillLight flex justify-center items-center relative">
            <Image
              src={getProfileImageUrl(userData?.profile_image_url || defaultImage)}
              alt="프로필 이미지"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1068px) 100vw"
              style={{ objectFit: "cover" }}
              className="rounded-[12px]"
              priority
            />
          </div>
          <ol>
            <li className="font-baseBold text-labelStrong">{userData.nickname}</li>
            <li className={`text-sm ${jobTitleClass} relative`}>
              <span className="pr-1">{userData.job_title}</span>
              <span>{userData.experience}</span>
            </li>
          </ol>
        </div>
      ) : (
        <div className="text-fillStrong">사용자 정보 없음.</div>
      )}
      <nav>
        <ul className="w-full">
          <li className="mb-3">
            <Link
              href="/mypage"
              className={`block w-full ${
                pathname === "/mypage" ? "text-labelStrong font-baseBold" : "text-labelNeutral"
              }`}
            >
              내 정보 수정
            </Link>
          </li>
          <li className="mb-3">
            <Link
              href="/mypage/myinterests"
              className={`block w-full ${
                pathname === "/mypage/myinterests" ? "text-labelStrong font-baseBold" : "text-labelNeutral"
              }`}
            >
              내 관심글
            </Link>
          </li>
          <li className="mb-3">
            <Link
              href="/mypage/myposts"
              className={`block w-full ${
                pathname === "/mypage/myposts" ? "text-labelStrong font-baseBold" : "text-labelNeutral"
              }`}
            >
              내 작성글
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftNav;
