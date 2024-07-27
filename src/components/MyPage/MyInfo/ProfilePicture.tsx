"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ProfileLoader from "@/components/Common/Skeleton/ProfileLoader";
import Image from "next/image";

const ProfilePicture: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileAlt, setProfileAlt] = useState<string>("프로필 이미지");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const userId = "2e47ab8c-da7a-4590-b114-b0512b1b22cd"; // 테스트용 user_id
  const defaultImage = "/Mypage/default-profile.png";
  const supabase = createClient();
  const iconImages = Array.from(
    { length: 10 },
    (_, index) => `/Mypage/ProfileIcon/${String(index + 1).padStart(2, "0")}.jpg`,
  );

  // 호버시 나타나는 직업들
  const occupations = [
    "프론트엔드",
    "백엔드",
    "디자이너",
    "IOS",
    "안드로이드",
    "데브옵스",
    "PM",
    "기획자",
    "마케터",
    "기타 직군",
  ];

  useEffect(() => {
    // 기존 프로필 이미지 로드
    const loadProfileImage = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("Users").select("profile_image_url").eq("user_id", userId).single();
      if (error) {
        console.error("프로필 이미지 로드 에러:", error);
        setProfileImage(defaultImage); // 오류 시 기본 이미지로 설정
      } else {
        const imageUrl = data?.profile_image_url || defaultImage;
        setProfileImage(imageUrl);
      }
      setLoading(false);
    };
    loadProfileImage();
  }, [supabase, userId]);

  // 문자열을 base64로 인코딩하는 함수
  const base64Encode = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  // 프로필 이미지 업로드 및 업데이트 함수
  const uploadProfileImage = async (file: File | Blob, altText: string) => {
    setUploading(true); // 업로드 시작

    try {
      const FileName = `profile_${base64Encode(userId)}.png`; // 파일명 난독화
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(`profileImages/${FileName}`, file, { upsert: true }); // 동일한 이미지명으로 업로드하여 이미지 변경
      if (uploadError) {
        console.error("파일 업로드 실패:", uploadError);
        setUploading(false);
        return;
      }

      // 업로드한 파일의 public URL 가져오기
      const { data: profileImageUrlData } = await supabase.storage
        .from("images")
        .getPublicUrl(`profileImages/${FileName}`);

      const profileImageUrl = profileImageUrlData.publicUrl;

      if (profileImageUrl) {
        // 데이터베이스에서 사용자의 프로필 이미지 URL 업데이트
        const { error: updateError } = await supabase
          .from("Users")
          .update({ profile_image_url: profileImageUrl })
          .eq("user_id", userId);
        if (updateError) {
          console.error("프로필 이미지 URL 업데이트 실패:", updateError);
        } else {
          // 데이터베이스 업데이트 후, 프로필 이미지 상태를 새 URL로 변경
          setProfileImage(profileImageUrl);
          setProfileAlt(altText);
        }
      } else {
        console.error("유효한 프로필 이미지 URL을 얻지 못했습니다.");
      }
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
    } finally {
      setUploading(false); // 업로드 완료
    }
  };

  // 파일 입력 이벤트 핸들러
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 사용자가 업로드한 파일
    if (file) {
      await uploadProfileImage(file, "프로필 이미지");
    }
  };

  // 직군 아이콘 클릭 이벤트 핸들러
  const handleIconClick = async (iconUrl: string, altText: string) => {
    const response = await fetch(iconUrl); // 아이콘 URL로부터 파일 가져오기
    const blob = await response.blob();
    await uploadProfileImage(blob, altText);
  };

  // 이미지 로드 에러 핸들러
  const handleImageError = () => {
    setProfileImage(defaultImage);
    setProfileAlt("프로필 이미지");
  };

  // 프로필 수정 버튼 클릭 핸들러
  const handleFileUploadClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // 캐시 방지용 URL 생성 함수
  const getProfileImageUrl = (url: string) => {
    return `${url}?${new Date().getTime()}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 s:border-none shadow-sm p-6 s:p-0 s:pb-4">
      <label className="block text-lg font-semibold text-gray-700 mb-3">프로필 사진</label>
      <div className="flex items-center s:flex-col s:items-start s:mb-3 gap-4">
        <div className="w-44 h-44 m:w-36 m:h-36 border rounded-[20px] overflow-hidden bg-gray-100 flex items-center justify-center s:mb-3 relative">
          {loading || uploading ? (
            <ProfileLoader className="w-full h-full rounded-[20px]"></ProfileLoader>
          ) : (
            <Image
              src={profileImage ? getProfileImageUrl(profileImage) : defaultImage}
              alt={profileAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1068px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="rounded-[20px]"
              onError={handleImageError}
              priority
            />
          )}
        </div>
        <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        <div className="grid grid-cols-5 gap-2 s:mb-4">
          {iconImages.map((icon, index) => (
            <div key={index} className="relative group">
              <button
                type="button"
                className="w-20 h-20 m:w-12 m:h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:opacity-85 relative"
                onClick={() => handleIconClick(icon, `${occupations[index]} 프로필 이미지`)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={icon}
                    alt={`${occupations[index]} 프로필 이미지`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1068px) 100vw"
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </button>
              <div
                className={`absolute whitespace-nowrap ${
                  index < 5 ? "bottom-full mb-2" : "top-full mt-2"
                } left-1/2 transform -translate-x-1/2 ${
                  index === 0 || index === 5 ? "s:-translate-x-1/4" : ""
                } bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}
              >
                {occupations[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex space-x-2">
        <button
          type="button"
          className="px-4 py-2 w-44 bg-gray-900 rounded-md text-sm text-white"
          onClick={handleFileUploadClick}
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
