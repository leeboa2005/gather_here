"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ProfileLoader from "@/components/Common/Skeleton/ProfileLoader";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/provider/UserContextProvider";
import CommonModal from "@/components/Common/Modal/CommonModal";
import LoginForm from "@/components/Login/LoginForm";

const ProfilePicture: React.FC = () => {
  const supabase = createClient();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileAlt, setProfileAlt] = useState<string>("프로필 이미지");
  const [uploading, setUploading] = useState(false);
  const { user, userData, setUserData } = useUser();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const router = useRouter();
  const defaultImage = "/assets/heder/user.svg";

  const iconImages = useMemo(() => {
    return Array.from(
      { length: 9 },
      (_, index) => `${imageBaseUrl}/profileicon_${String(index + 1).padStart(2, "0")}.jpg`,
    );
  }, [imageBaseUrl]);

  const occupations = ["프론트엔드", "백엔드", "디자이너", "IOS", "안드로이드", "데브옵스", "PM", "기획자", "마케팅"];

  // 프로필 이미지 업로드 및 업데이트 함수
  const uploadProfileImage = async (file: File | Blob, altText: string) => {
    if (!user) return;
    setUploading(true);
    try {
      const FileName = `profile_${base64Encode(user.id)}.png`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(`profileImages/${FileName}`, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: profileImageUrlData } = await supabase.storage
        .from("images")
        .getPublicUrl(`profileImages/${FileName}`);

      const profileImageUrl = profileImageUrlData.publicUrl;

      if (profileImageUrl) {
        const { error: updateError } = await supabase
          .from("Users")
          .update({ profile_image_url: profileImageUrl })
          .eq("user_id", user.id);
        if (updateError) throw updateError;

        setProfileImage(profileImageUrl);
        setProfileAlt(altText);
        setUserData({ ...userData, profile_image_url: profileImageUrl });
        toast.success("업데이트 완료하였습니다.");
      } else {
        throw new Error("프로필 이미지 URL을 얻지 못했습니다.");
      }
    } catch (error) {
      console.error("프로필 이미지 업데이트 중 오류 발생:", error);
      toast.error("완료되지 않았습니다.");
    } finally {
      setUploading(false);
    }
  };

  // 파일 입력 이벤트 핸들러
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await uploadProfileImage(file, "프로필 이미지");
  };

  // 직군 아이콘 클릭 이벤트 핸들러
  const handleIconClick = async (iconUrl: string, altText: string) => {
    const response = await fetch(iconUrl);
    const blob = await response.blob();
    await uploadProfileImage(blob, altText);
  };

  // 이미지 로드 에러 핸들러
  const handleImageError = () => {
    setProfileImage(null);
    setProfileAlt("프로필 이미지");
  };

  // 프로필 수정 버튼 클릭 핸들러
  const handleFileUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // 캐시 방지용 URL 생성 함수
  const getProfileImageUrl = (url: string) => `${url}?${new Date().getTime()}`;

  // 사용자 데이터에 따라 프로필 이미지를 설정하는 훅
  useEffect(() => {
    if (userData) {
      setProfileImage(userData.profile_image_url || defaultImage);
    }
  }, [userData]);

  // 문자열을 base64로 인코딩하는 함수
  const base64Encode = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  return (
    <>
      <CommonModal
        isOpen={showLoginModal}
        onRequestClose={() => {
          setShowLoginModal(false);
          router.push("/");
        }}
      >
        <LoginForm />
      </CommonModal>
      <div className="px-6 pt-6 pb-10 s:p-0 s:pb-4 border-b-[1px] border-fillNormal">
        <label className="block text-subtitle font-baseBold text-labelNeutral mb-5">프로필 사진</label>
        <div className="flex items-center s:flex-col s:items-start s:mb-3 gap-5">
          <div className="w-36 h-36 rounded-[20px] overflow-hidden bg-fillLight flex items-center justify-center s:mb-3 relative">
            {uploading ? (
              <ProfileLoader className="w-full h-full rounded-[20px]" />
            ) : profileImage ? (
              <Image
                src={getProfileImageUrl(profileImage)}
                alt={profileAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1068px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="rounded-[20px]"
                onError={handleImageError}
                priority
              />
            ) : (
              <ProfileLoader className="w-full h-full rounded-[20px]" />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <img src="/assets/mypage/hover_plus.svg" width={24} height={24} alt="플러스 버튼 아이콘" />
            </div>
          </div>
          <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          <div className="grid grid-cols-5 gap-2 s:mb-4">
            <div className="relative">
              <button
                type="button"
                className="w-[52px] h-[52px] m:w-[48px] m:h-[48px] rounded-full overflow-hidden bg-fillLight flex items-center justify-center"
                onClick={handleFileUploadClick}
              >
                <img src="/assets/mypage/image_upload.svg" width={24} height={24} alt="이미지 업로드 아이콘" />
              </button>
            </div>
            {iconImages.map((icon, index) => (
              <div key={index} className="relative group">
                <button
                  type="button"
                  className="w-[52px] h-[52px] m:w-[48px] m:h-[48px] rounded-full overflow-hidden bg-fillLight flex items-center justify-center"
                  onClick={() => handleIconClick(icon, `${occupations[index]} 프로필 이미지`)}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={icon}
                      alt={`${occupations[index]} 프로필 이미지`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1068px) 100vw"
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                      priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <img src="/assets/mypage/hover_plus.svg" width={24} height={24} alt="호버시 플러스 버튼 아이콘" />
                    </div>
                  </div>
                </button>
                <div
                  className={`absolute whitespace-nowrap ${
                    index < 4 ? "bottom-full mb-2" : "top-full mt-2"
                  } left-1/2 transform -translate-x-1/2 ${
                    index === 0 ? "s:-translate-x-1/4" : ""
                  } bg-fillStrong text-fontWhite text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}
                >
                  {occupations[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePicture;
