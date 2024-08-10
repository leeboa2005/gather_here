"use client";

import Calender from "@/components/MainPage/MainSideBar/Calender/Calender";
import Chat from "@/components/MainPage/MainSideBar/Chat/Chat";
import { useState } from "react";
import CommonModal from "@/components/Common/Modal/CommonModal";
import Image from "next/image";

const MainSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="col-span-1 m:hidden">
        <div className="sticky top-4">
          <h4 className="flex items-center ml-2 mb-4 text-labelStrong">아래에 새로운 요소 들어갈 자리임</h4>
          <div className="w-full h-full bg-primary">
            <Image src="/assets/blank.svg" width={322} height={256} alt="빈 이미지" />
          </div>
          <Calender />
        </div>
      </div>
      <button onClick={openModal} className="fixed bottom-4 right-1 z-10 hover:animate-bounce">
        <Image src="/Chat/chat.svg" alt="Chat icon" width={90} height={60} priority className="w-auto h-auto" />
      </button>
      <CommonModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <Chat />
      </CommonModal>
    </>
  );
};

export default MainSideBar;
