"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/provider/UserContextProvider";
// import Image from "next/image";
// import { useModal } from "@/provider/ContextProvider";
// import { useRouter } from "next/navigation";

const ProfileInfo: React.FC = () => {
  // const { openModal, closeModal } = useModal();
  // const router = useRouter();
  const supabase = createClient();

  const { user, userData, fetchUserData } = useUser();
  const [nickname, setNickname] = useState("");
  const [blog, setBlog] = useState("");
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname ?? "");
      setBlog(userData.blog ?? "");
      setJob(userData.job_title ?? "");
      setExperience(userData.experience ?? "");
    }
  }, [userData]);

  const validateForm = () => {
    let valid = true;

    // 닉네임 유효성 검사
    if (nickname.length < 2 || nickname.length > 11) {
      setNicknameError("닉네임은 2-11자가 아닙니다.");
      valid = false;
    } else {
      setNicknameError("");
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user?.email ?? "")) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    return valid;
  };

  // 사용자 정보 업데이트
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !validateForm()) return;

    const { error } = await supabase
      .from("Users")
      .update({ nickname, blog, job_title: job, experience })
      .eq("user_id", user.id);

    if (error) {
      console.error("사용자 정보 업데이트 에러:", error);
      toast.error("완료되지 않았습니다.");
    } else {
      toast.success("정보가 업데이트되었습니다.");
      fetchUserData();
    }
  };

  // 회원 탈퇴 기능 (추후 작업예정)
  // const handleDeleteAccount = async () => {
  //   if (!user) return;

  //   try {
  //     const { error: deleteError } = await supabase.from("Users").delete().eq("user_id", user.id);
  //     if (deleteError) throw deleteError;

  //     const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
  //     if (authError) throw authError;

  //     await supabase.auth.signOut();
  //     router.push("/");
  //   } catch (error) {
  //     console.error("회원 탈퇴 중 오류 발생:", error);
  //     toast.error("회원 탈퇴 중 오류가 발생했습니다.");
  //   }
  // };

  // 회원 탈퇴 모달 (mvp 이후)
  // const handleOpenModal = () => {
  //   const onRequestClose = () => {
  //     closeModal();
  //   };

  //   openModal(
  //     <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 text-center">
  //       <div className="relative min-w-[340px]  m:min-w-[300px] p-6 bg-fillStrong rounded-lg shadow-lg ">
  //         <button
  //           onClick={onRequestClose}
  //           className="absolute top-2 right-2 text-gray-500 hover:"
  //           aria-label="모달 닫기"
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={2}
  //             stroke="currentColor"
  //             className="w-6 h-6"
  //           >
  //             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  //           </svg>
  //         </button>
  //         <div className="mb-4 w-auto flex justify-center">
  //           <Image src="/Common/Icons/caution_icon.png" alt="Profile Image" width={70} height={70} />
  //         </div>
  //         <h2 className="mb-2 text-lg font-semibold text-fillStrong">정말 탈퇴하시겠어요?</h2>
  //         <div className="mb-5">
  //           <p className="text-gray-500 text-sm">
  //             회원 탈퇴 시 계정은 삭제되며
  //             <br /> 복구되지 않습니다.
  //           </p>
  //         </div>
  //         <div className="flex justify-center space-x-2">
  //           <button onClick={onRequestClose} className="shared-button-gray w-1/2" aria-label="회원 탈퇴 취소">
  //             취소
  //           </button>
  //           <button onClick={handleDeleteAccount} className="shared-button-black w-1/2" aria-label="회원 탈퇴">
  //             탈퇴
  //           </button>
  //         </div>
  //       </div>
  //     </div>,
  //   );
  // };

  return (
    <section>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <fieldset className="p-6 s:p-0 ">
          <h1 className="text-subtitle font-baseBold text-labelNeutral mb-5">기본 정보</h1>
          <div className="grid grid-cols-2 m:grid-cols-1 gap-10 pb-11 border-b-[1px] border-fillNormal">
            <div>
              <label htmlFor="email" className="block text-sm text-labelDisabled font-medium mb-1">
                이메일
              </label>
              <input
                type="text"
                id="email"
                name="email"
                disabled
                value={user?.email ?? ""}
                className="w-full shared-input-gray-2 border-[1px] border-fillLight"
                style={{ color: "#454545" }}
              />
              {emailError && <p className="text-statusDestructive text-baseXs mt-1">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="nickname" className="block text-baseS text-labelNormal font-medium mb-1">
                닉네임 <span className="text-statusDestructive ml-1">*</span>
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요."
                className="w-full shared-input-gray-2 border-[1px] border-fillLight"
              />
              <p className="text-labelAssistive text-baseXs mt-1">닉네임은 2-11자 내로 작성해주세요.</p>
              {nicknameError && <p className="text-statusDestructive text-baseXs mt-1">{nicknameError}</p>}
            </div>
            <div className="mt-[-13px] s:mt-0">
              <label htmlFor="job" className="block text-sm font-medium text-labelNormal mb-1">
                직군 <span className="text-statusDestructive ml-1">*</span>
              </label>
              <select
                id="job"
                name="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full shared-select-gray-2 border-[1px] border-fillLight"
              >
                <option value="">선택해주세요</option>
                <option value="프론트엔드">프론트엔드</option>
                <option value="백엔드">백엔드</option>
                <option value="디자이너">디자이너</option>
                <option value="IOS">IOS</option>
                <option value="안드로이드">안드로이드</option>
                <option value="데브옵스">데브옵스</option>
                <option value="PM">PM</option>
                <option value="기획자">기획자</option>
                <option value="마케팅">마케팅</option>
              </select>
            </div>
            <div className="mt-[-13px] s:mt-0">
              <label htmlFor="experience" className="block text-sm font-medium text-labelNormal mb-1">
                경력<span className="text-statusDestructive ml-1">*</span>
              </label>
              <select
                id="experience"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full shared-select-gray-2 border-[1px] border-fillLight"
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
            <div>
              <label htmlFor="blog" className="block text-sm font-medium mb-1 text-labelNormal">
                URL&nbsp;<span className="text-labelAssistive text-baseXs">(선택)</span>
              </label>
              <input
                type="url"
                id="blog"
                name="blog"
                value={blog}
                onChange={(e) => setBlog(e.target.value)}
                placeholder="링크를 입력해주세요."
                className="w-full shared-input-gray-2 border-[1px] border-fillLight"
              />
              <p className="text-labelAssistive text-baseXs mt-1">
                자신을 나타낼 수 있는 포트폴리오 링크를 알려주세요.
              </p>
            </div>
          </div>
          <div className="mt-6 mb-12">
            {/* mvp 이후 */}
            {/* <button type="button" aria-label="회원 탈퇴하기" onClick={handleOpenModal} className="mb-6 hover:underline">
              탈퇴하기
            </button> */}
            <div className="s:fixed flex s:justify-center s:bottom-0 s:left-0 s:right-0 s:p-4 s:bg-background s:z-10">
              <div className="flex justify-end s:justify-center gap-2 w-full s:max-w-container-s">
                <button type="button" aria-label="회원 정보 취소" className="shared-button-gray w-[65px] s:w-1/2">
                  취소
                </button>
                <button type="submit" aria-label="회원 정보 저장" className="shared-button-green w-[65px] s:w-1/2">
                  저장
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default ProfileInfo;
