"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import SkeletonLoader from "@/components/Common/Skeleton/ProfileLoader";
import Image from "next/image";

const ProfilePicture: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const userId = "2e47ab8c-da7a-4590-b114-b0512b1b22cd"; // 테스트할 user_id
  const defaultImage = "/Mypage/default-profile.png";
  const supabase = createClient();
  const iconImages = Array.from(
    { length: 10 },
    (_, index) => `/Mypage/ProfileIcon/${String(index + 1).padStart(2, "0")}.jpg`,
  );

  // 호버시 나타나는 직업들
  const occupations = [
    "프론트앤드",
    "백앤드",
    "디자이너",
    "IOS",
    "안드로이드",
    "데브옵스",
    "PM",
    "기획자",
    "마케터",
    "기타",
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

  // 이미지명 난독화 (str: 인코딩할 문자열, base64: 인코딩된 문자열 )
  const base64Encode = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 사용자가 업로드한 파일
    if (file) {
      setUploading(true); // 업로드 시작

      try {
        const uniqueFileName = `profile_${base64Encode(userId)}.png`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(`profileImages/${uniqueFileName}`, file, { upsert: true }); // 동일한 이미지이면 새로운 이미지로 변경됨
        if (uploadError) {
          console.error("파일 업로드 에러:", uploadError);
          setUploading(false);
          return;
        }

        // 업로드한 파일의 public URL 가져오기
        const { data: profileUrlData } = await supabase.storage
          .from("images")
          .getPublicUrl(`profileImages/${uniqueFileName}`);
        const profileUrl = profileUrlData?.publicUrl;

        if (profileUrl) {
          // 데이터베이스에서 사용자의 프로필 이미지 URL 업데이트
          const { error: updateError } = await supabase
            .from("Users")
            .update({ profile_image_url: profileUrl })
            .eq("user_id", userId);
          if (updateError) {
            console.error("프로필 이미지 URL 업데이트 에러:", updateError);
          } else {
            // 데이터베이스 업데이트 후, 프로필 이미지 상태를 새 URL로 변경
            setProfileImage(profileUrl);
          }
        } else {
          console.error("유효한 프로필 이미지 URL을 얻지 못했습니다.");
        }
      } catch (error) {
        console.error("파일 업로드 중 오류 발생:", error);
      } finally {
        setUploading(false); // 업로드 완료
      }
    }
  };

  // 이미지 에러 핸들러
  const handleImageError = () => {
    setProfileImage(defaultImage);
  };

  // 프로필 수정 버튼 클릭 핸들러
  const handleFileUploadClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // 캐시 방지
  const getProfileImageUrl = (url: string) => {
    return `${url}?${new Date().getTime()}`;
  };

  const handleIconClick = async (iconUrl: string) => {
    setUploading(true); // 업로드 시작

    try {
      // 데이터베이스에서 사용자의 프로필 이미지 URL 업데이트
      const { error: updateError } = await supabase
        .from("Users")
        .update({ profile_image_url: iconUrl })
        .eq("user_id", userId);
      if (updateError) {
        console.error("프로필 이미지 URL 업데이트 에러:", updateError);
      } else {
        // 데이터베이스 업데이트 후, 프로필 이미지 상태를 새 URL로 변경
        setProfileImage(iconUrl);
      }
    } catch (error) {
      console.error("프로필 이미지 업데이트 중 오류 발생:", error);
    } finally {
      setUploading(false); // 업로드 완료
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 s:border-none shadow-sm p-7 s:p-0 s:pb-4">
      <label className="block text-lg font-semibold text-gray-700 mb-3">프로필 사진</label>
      <div className="flex items-center s:flex-col s:items-start s:mb-3 gap-4">
        <div className="w-44 h-44  m:w-36 m:h-36 border rounded-[20px] overflow-hidden bg-gray-100 flex items-center justify-center s:mb-3 relative">
          {loading || uploading ? (
            <SkeletonLoader className="w-full h-full rounded-[20px]"></SkeletonLoader>
          ) : (
            <Image
              src={profileImage ? getProfileImageUrl(profileImage) : defaultImage}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-[20px]"
              onError={handleImageError}
            />
          )}
        </div>
        <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        <div className="grid grid-cols-5 gap-2 s:mb-4">
          {iconImages.map((icon, index) => (
            <div key={index} className="relative group">
              <button
                type="button"
                className="w-20 h-20 m:w-12 m:h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:opacity-75 relative"
                onClick={() => handleIconClick(icon)}
              >
                <div className="relative w-full h-full">
                  <Image src={icon} alt={occupations[index]} layout="fill" objectFit="cover" />
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
