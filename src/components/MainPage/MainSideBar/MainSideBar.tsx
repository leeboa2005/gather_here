"use client";

import Calender from "@/components/MainPage/MainSideBar/Calender/Calender";
import Chat from "@/components/MainPage/MainSideBar/Chat/Chat";
import { useEffect, useState } from "react";
import Image from "next/image";
import ChatModal from "./Chat/ChatModal";

const MainSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1068);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !isMobile) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
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
      {!isMobile && showScrollToTop && (
        <button onClick={scrollToTop} className="fixed flex bottom-20 right-1 hover:animate-bounce">
          <Image
            src="/assets/top.svg"
            alt="Top icon"
            width={20}
            height={20}
            style={{ width: "auto", height: "auto" }}
          />
        </button>
      )}
      {isModalOpen ? (
        <button onClick={closeModal} className="fixed bottom-4 right-1 z-10 hover:animate-bounce">
          <Image src="/Chat/close.svg" alt="채팅창 닫기 버튼" width={90} height={60} priority />
        </button>
      ) : (
        <button onClick={openModal} className="fixed bottom-4 right-1 z-10 hover:animate-bounce">
          <Image
            src="/Chat/chat.svg"
            alt="채팅창 열기 버튼"
            width={90}
            height={60}
            priority
            className="w-auto h-auto"
          />
        </button>
      )}
      <ChatModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <Chat />
      </ChatModal>
    </>
  );
};

export default MainSideBar;
