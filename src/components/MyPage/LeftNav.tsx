"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Database } from "@/types/supabase";
import LeftNavLoader from "@/components/Common/Skeleton/LeftNavLoader";

type UserData = Database["public"]["Tables"]["Users"]["Row"];

const LeftNav: React.FC = () => {
  const pathname = usePathname();
  const supabase = createClient();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = "2e47ab8c-da7a-4590-b114-b0512b1b22cd";
  const defaultImage = "/Mypage/default-profile.png";

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("Users").select("*").eq("user_id", userId).single();

      if (error) {
        console.error("사용자 데이터 불러오기 실패:", error);
      } else {
        setUserData(data as UserData);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId, supabase]);

  // 캐시 방지용 URL 생성 함수
  const getProfileImageUrl = (url: string) => {
    return `${url}?${new Date().getTime()}`;
  };

  return (
    <aside className="sticky s:relative top-0 p-6 s:p-0 max-h-[260px] flex flex-col items-start gap-3 rounded-[20px] border border-[#E6E6E6] s:border-none bg-white shadow-sm">
      {loading ? (
        <LeftNavLoader />
      ) : userData ? (
        <div className="flex items-center gap-3 mb-5">
          <div className="w-20 h-20 m:w-16 m:h-16 bg-gray-200 rounded-full flex justify-center items-center border relative">
            <Image
              src={getProfileImageUrl(userData.profile_image_url || defaultImage)}
              alt="프로필 이미지"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1068px) 100vw"
              style={{ objectFit: "cover" }}
              className="rounded-full"
              priority
            />
          </div>
          <ol>
            <li className="font-bold">{userData.nickname}</li>
            <li className="text-sm text-gray-500">{userData.email}</li>
          </ol>
        </div>
      ) : (
        <div className="text-red-500">사용자 정보를 불러올 수 없습니다.</div>
      )}
      <nav>
        <ul className="w-full">
          <li className="mb-3">
            <Link href="/mypage" className={`block w-full ${pathname === "/mypage" ? "font-bold" : ""}`}>
              내 정보 수정
            </Link>
          </li>
          <li className="mb-3">
            <Link
              href="/mypage/myinterests"
              className={`block w-full  ${pathname === "/mypage/myinterests" ? "font-bold" : ""}`}
            >
              내 관심글
            </Link>
          </li>
          <li className="mb-3">
            <Link
              href="/mypage/myposts"
              className={`block w-full ${pathname === "/mypage/myposts" ? "font-bold" : ""}`}
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
