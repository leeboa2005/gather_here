"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ProfileLoader from "@/components/Common/Skeleton/ProfileLoader";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePicture: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileAlt, setProfileAlt] = useState<string>("프로필 이미지");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const defaultImage = "/Mypage/default-profile.png";
  const supabase = createClient();
  const router = useRouter();
  const iconImages = Array.from(
    { length: 10 },
    (_, index) => `/Mypage/ProfileIcon/${String(index + 1).padStart(2, "0")}.jpg`,
  );

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
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/");
        return;
      }
      setUser(user);
    };
    fetchUser();
  }, [supabase, router]);

  useEffect(() => {
    const loadProfileImage = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase.from("Users").select("profile_image_url").eq("user_id", user.id).single();
      if (error) {
        console.error("프로필 이미지 로드 에러:", error);
        setProfileImage(defaultImage);
      } else {
        setProfileImage(data?.profile_image_url || defaultImage);
      }
      setLoading(false);
    };
    loadProfileImage();
  }, [supabase, user]);

  const base64Encode = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

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
        toast.success("프로필 이미지 업데이트 성공하였습니다.", {
          onClose: () => console.log("프로필 이미지 업데이트 성공 토스트가 닫혔습니다."),
        });
      } else {
        throw new Error("유효한 프로필 이미지 URL을 얻지 못했습니다.");
      }
    } catch (error) {
      console.error("프로필 이미지 업데이트 중 오류 발생:", error);
      toast.error("프로필 이미지 업데이트 실패하였습니다.🥺", {
        onClose: () => console.log("프로필 이미지 업데이트 실패 토스트가 닫혔습니다."),
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await uploadProfileImage(file, "프로필 이미지");
  };

  const handleIconClick = async (iconUrl: string, altText: string) => {
    const response = await fetch(iconUrl);
    const blob = await response.blob();
    await uploadProfileImage(blob, altText);
  };

  const handleImageError = () => {
    setProfileImage(defaultImage);
    setProfileAlt("프로필 이미지");
  };

  const handleFileUploadClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const getProfileImageUrl = (url: string) => `${url}?${new Date().getTime()}`;

  // 처리 방식 고민해보기 (로그인 X 보이는 화면)
  if (!user) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-fillLight shadow-sm p-6 s:p-0 s:pb-4 s:bg-background">
      <ToastContainer />
      <label className="block text-lg font-subtitle text-fontWhite mb-3">프로필 사진</label>
      <div className="flex items-center s:flex-col s:items-start s:mb-3 gap-4">
        <div className="w-44 h-44 m:w-36 m:h-36 border-[1px] rounded-[20px] overflow-hidden bg-gray-100 flex items-center justify-center s:mb-3 relative">
          {loading || uploading ? (
            <ProfileLoader className="w-full h-full rounded-[20px]" />
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
                className="w-20 h-20 m:w-12 m:h-12 rounded-full overflow-hidden border-[1px] border-gray-200 hover:opacity-85 relative"
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
                      className="h-6 w-6 text-fontWhite"
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
                } bg-fillStrong text-fontWhite text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}
              >
                {occupations[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex space-x-2">
        <button type="button" className="shared-button-black" onClick={handleFileUploadClick}>
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
