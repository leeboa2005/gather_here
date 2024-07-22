"use client";

import React from "react";
import { useModal } from "@/Provider/ContextProvider";

const ModalTest: React.FC = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <div>
        <h2>모달 제목</h2>
        <p>모달 내용입니다.</p>
        <button onClick={closeModal}>닫기</button>
      </div>,
    );
  };

  return (
    <div>
      <h1>모달 테스트</h1>
      <button onClick={handleOpenModal}>모달 열기</button>
    </div>
  );
};

export default ModalTest;
