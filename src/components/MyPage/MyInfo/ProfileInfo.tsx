"use client";

import Image from "next/image";
import { useModal } from "@/provider/ContextProvider";

const ProfileInfo: React.FC = () => {
  const { openModal, closeModal } = useModal();

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
          <h2 className="mb-2 text-lg font-semibold">정말 탈퇴하시겠어요?</h2>
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
            <button type="submit" className="shared-button-black w-1/2">
              탈퇴
            </button>
          </div>
        </div>
      </div>,
    );
  };

  return (
    <section>
      <form className="space-y-6">
        <fieldset className="rounded-2xl bg-fillLight shadow-sm p-6 s:p-0 s:bg-background">
          <h1 className="text-lg font-semibold mb-4">기본 정보</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium mb-1">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
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
                placeholder="링크를 입력해주세요."
                className="w-full shared-input-gray-2"
              />
            </div>
            <div>
              <label htmlFor="job" className="block text-sm font-medium  mb-1">
                직군
              </label>
              <select id="job" name="job" className="w-full shared-select-gray-2">
                <option>프론트엔드 개발자</option>
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium  mb-1">
                경력
              </label>
              <select id="experience" name="experience" className="w-full shared-select-gray-2">
                <option>N년</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button type="button" aria-label=" 회원 탈퇴" onClick={handleOpenModal} className="mb-6 hover:underline">
              회원 탈퇴
            </button>
            <div className="flex justify-start gap-2">
              <button type="button" aria-label=" 회원 정보 취소" className="shared-button-white">
                취소
              </button>
              <button type="submit" aria-label=" 회원 정보 저장" className="shared-button-black">
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
