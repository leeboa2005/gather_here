"use client";

import Image from "next/image";
import { useModal } from "@/provider/ContextProvider";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileInfo: React.FC = () => {
  const { openModal, closeModal } = useModal();
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState("");
  const [blog, setBlog] = useState("");
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/");
        return;
      }
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("Users")
          .select("email, nickname, blog, job_title, experience")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("사용자 정보 로드 에러:", error);
        } else if (data) {
          setNickname(data.nickname || "");
          setBlog(data.blog || "");
          setJob(data.job_title || "");
          setExperience(data.experience || "");
        }
      }
    };

    fetchUserData();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from("Users")
      .update({ nickname, blog, job_title: job, experience })
      .eq("user_id", user.id);

    if (error) {
      console.error("사용자 정보 업데이트 에러:", error);
      toast.error("사용자 정보 업데이트 중 오류가 발생했습니다.");
    } else {
      toast.success("정보 업데이트되었습니다.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      const { error: deleteError } = await supabase.from("Users").delete().eq("user_id", user.id);
      if (deleteError) throw deleteError;

      const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
      if (authError) throw authError;

      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("회원 탈퇴 중 오류 발생:", error);
      toast.error("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  // 회원 탈퇴 모달
  const handleOpenModal = () => {
    const onRequestClose = () => {
      closeModal();
    };

    openModal(
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 text-center">
        <div className="relative w-80 p-6 bg-white rounded-lg shadow-lg">
          <button
            onClick={onRequestClose}
            className="absolute top-2 right-2 text-gray-500 hover:"
            aria-label="모달 닫기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mb-4 w-auto flex justify-center">
            <Image src="/Common/Icons/caution_icon.png" alt="Profile Image" width={70} height={70} />
          </div>
          <h2 className="mb-2 text-lg font-semibold text-fillStrong">정말 탈퇴하시겠어요?</h2>
          <div className="mb-5">
            <p className="text-gray-500 text-sm">
              회원 탈퇴 시 계정은 삭제되며
              <br /> 복구되지 않습니다.
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            <button onClick={onRequestClose} className="shared-button-gray w-1/2" aria-label="회원 탈퇴 취소">
              취소
            </button>
            <button onClick={handleDeleteAccount} className="shared-button-black w-1/2" aria-label="회원 탈퇴">
              탈퇴
            </button>
          </div>
        </div>
      </div>,
    );
  };

  if (!user) {
    return null;
  }

  return (
    <section>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <fieldset className="rounded-2xl bg-fillLight shadow-sm p-6 s:p-0 s:bg-background">
          <h1 className="text-lg font-semibold mb-4">기본 정보</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium mb-1">
                이메일
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                disabled
                value={user.email}
                className="w-full shared-input-gray-2"
              />
            </div>
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium mb-1">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요."
                className="w-full shared-input-gray-2"
              />
            </div>
            <div>
              <label htmlFor="blog" className="block text-sm font-medium mb-1">
                블로그 <span className="text-gray-400">(선택)</span>
              </label>
              <input
                type="url"
                id="blog"
                name="blog"
                value={blog}
                onChange={(e) => setBlog(e.target.value)}
                placeholder="링크를 입력해주세요."
                className="w-full shared-input-gray-2"
              />
            </div>
            <div>
              <label htmlFor="job" className="block text-sm font-medium  mb-1">
                직군
              </label>
              <select
                id="job"
                name="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full shared-select-gray-2"
              >
                <option value="">선택해주세요</option>
                <option value="프론트엔드 개발자">프론트엔드 개발자</option>
                <option value="백엔드 개발자">백엔드 개발자</option>
                <option value="디자이너">디자이너</option>
                <option value="IOS">IOS</option>
                <option value="안드로이드">안드로이드</option>
                <option value="데브옵스">데브옵스</option>
                <option value="PM">PM</option>
                <option value="기획자">기획자</option>
                <option value="마케터">마케터</option>
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium  mb-1">
                경력
              </label>
              <select
                id="experience"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full shared-select-gray-2"
              >
                <option value="">선택해주세요</option>
                <option value="1년 미만">1년 미만</option>
                <option value="1년">1년</option>
                <option value="2년">2년</option>
                <option value="3년">3년</option>
                <option value="4년">4년</option>
                <option value="5년">5년</option>
                <option value="6년">6년</option>
                <option value="7년">7년</option>
                <option value="8년 이상">8년 이상</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button type="button" aria-label="회원 탈퇴" onClick={handleOpenModal} className="mb-6 hover:underline">
              회원 탈퇴
            </button>
            <div className="flex justify-start gap-2">
              <button type="button" aria-label="회원 정보 취소" className="shared-button-white">
                취소
              </button>
              <button type="submit" aria-label="회원 정보 저장" className="shared-button-black">
                저장
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default ProfileInfo;
