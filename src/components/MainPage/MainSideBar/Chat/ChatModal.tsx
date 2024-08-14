import Image from "next/image";
import React, { FC, ReactNode } from "react";
import ReactModal from "react-modal";
import Modal from "react-modal";

interface ChatModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const customStyle: ReactModal.Styles = {
  overlay: {},
  content: {
    zIndex: "10",
    position: "fixed", // Change from absolute to fixed
    bottom: "100px", // Adjust based on your button’s position
    right: "20px", // Adjust based on your button’s position
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
  },
};

const ChatModal: FC<ChatModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen} // 모달 열려있는지 여부 결정
      onRequestClose={onRequestClose} // 모달 닫는 함수
      style={customStyle}
      shouldCloseOnOverlayClick={false} // 바깥 영역 클릭시 닫힘모드
      className="flex items-center justify-center z-10"
      overlayClassName="flex items-center justify-center z-10"
      contentLabel="모달"
    >
      <div className="relative bg-fillStrong rounded-lg p-8 max-w-lg mx-auto">
        {/* 모달 닫기 버튼 */}
        {/* TODO: 채팅창 내부 디자인 시안 반영하기 */}
        <button
          onClick={onRequestClose}
          className="hidden m:block absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <Image
            src="/Chat/close_in_modal.svg"
            alt="채팅창 닫기 버튼"
            width={90}
            height={60}
            priority
            className="w-auto h-auto"
          />
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default ChatModal;
